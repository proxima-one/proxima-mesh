
/*
This is the complete version will include:

 - Storage/Cache
 - Plugins
 - Providers

 - Needs to start, stop, dial, connect, store
 - Just the data not the functions
*/

const OraNode = require('../ora-node').node
const assert = require('assert')
const pify = require('pify')
const async = require('async')
const pull  = require('pull-stream')
const EventEmitter = require('events')
const Curkel = require('curkel-db')



class Ora extends EventEmitter {
  constructor(node, _options) {
    super()
    assert(node, "Node must exist")
    this._node = node
    this._oraNode = new OraNode({node})
    this.hasProvider = false
    this._provider = null //TODO can be fixed
    this._registry = _options.registry


    this._node.start = pify(node.start.bind(node))
    this._node.stop = pify(node.stop.bind(node))



    /*
    -- Connection will have two types:
      -- This is only for Ora (will add peerInfo to registry) (RPC needed?? No)
    */
    this._oraNode.on('ora:connection', (conn) => {
      conn.getPeerInfo((err, peerInfo) => {
        if (err) {
          throw err
        }
        this._oraNode.connected.set(peerInfo.id.toB58String(), peerInfo)
        this._registry.update(peerInfo.id.toB58String(), peerInfo)
        /*
        Update Clients
        */
      })
  })

//Service library
this.on('update', (service, data, sender) => {
        console.log(JSON.stringify(data))

        var stream = data
        this.gossip(service, stream, sender);
});


}

addService(serviceName, serviceStruct, serviceHandlers) {
  //let serviceName = service.serviceName;
  //bind to server with name of service and handle connections
  this._node.handle("/" + serviceName, (_, conn) => {
      conn.getPeerInfo((err, peerInfo) => {
        if (err) {
          throw err
        }
        this._registry.update(peerInfo.id.toB58String(), peerInfo)
        this._oraNode.emit(serviceName + ':connection', conn, peerInfo.id.toB58String())
        this._oraNode.connected.set(peerInfo.id.toB58String(), peerInfo);
      })});


  //handle the data coming in to the server (decode)
  this._oraNode.on(serviceName + ':connection', (conn, sender) => {
      //get information and decode
      pull(
        conn,
        pull.collect((err, data) => {
            this.emit(serviceName + ':update', data, sender)
          }
        )
        )
      });

  //handler
  this.on(serviceName + ':update', (serviceName, data, sender) => {
    //convert to JSON
    var stream = JSON.parse(data)
    var stream = JSON.parse(stream)
    var data = stream.data
    console.log(data)
    var eventName = serviceName + ":" + stream.action;
    console.log(eventName)
    this.emit(eventName, serviceName, data, sender)
  });








  this.on(serviceName + ':put', (serviceName, data, sender) => {
    this.put(data.indexName, data.key, data.value, serviceName, sender)
    //gossip //or decide to
    //confirmation
  });



  this.on(serviceName + ':delete', (serviceName, data, sender) => {
    this.del(data.indexName, data.key, serviceName, sender)
    //gossip
    //respond
  });



  this.on(serviceName + ':create', (serviceName, data, sender) => {
    this.create(data.indexName, serviceName, sender)
    //gossip depending on replication
    //respond
  });



  this.on(serviceName + ':get', (serviceName, data, sender) => {
    this.get(data.indexName, data.key, serviceName, sender)
  });

  }


/*
Get change
*/
async get(indexName, key, serviceName = "", sender = "") {
  //Checks
  var response = await Curkel.get(indexName, key);
  console.log(response);
  //response
  if (sender !== "") {
    var str = response; //JSON.stringify(response);
    this.send(sender, service, str);
  }

  //Broadcasts the same call to everyone
  var data = {indexName: indexName,
            key: key}
  var msg = {service: serviceName, action: 'get', data: data};
  var stream = JSON.stringify(msg);
  this.gossip(serviceName, stream, sender); //then
  console.log("get");
  //return response;
}

/*
Put
*/
async put(indexName, key, value, serviceName = "", sender = "") {
  var response = await Curkel.put(indexName, key, value)
  //response


  var data = {indexName: indexName,
            key: key,
          value: value};
  var msg = {service: serviceName, action: 'put', data: data};
  var stream = JSON.stringify(msg);
  this.gossip(serviceName, stream, sender);
  console.log("put")
}

/*

*/
async del(indexName, key, serviceName = "", sender = "") {
  var response = await Curkel.delete(indexName, key)
  //response


  var data = {indexName: indexName,
            key: key}
  var msg = {service: serviceName, action: 'delete', data: data};
  var stream = JSON.stringify(msg);
  this.gossip(serviceName, stream, sender);
  console.log("delete")
}

///create...
async create(indexName, serviceName = "", sender = "") {
  var response = await Curkel.create(indexName);
  //respond



  var data = {indexName: indexName}
  var msg = {service: serviceName, action: 'create', data: data};
  var stream = JSON.stringify(msg);
  console.log("create")
  console.log("No gossip")
  //this.gossip(serviceName, stream, sender);

}




send(sender, service, stream) {
  var peer = this._registry.get(sender);
  this._oraNode.sendTo(peer, "/" + service, stream);
}


gossip(service, stream, sender=null) {
    const peers = this._registry.getPeers()
    console.log(peers)
    for (const [key, value] of peers.entries()) {
        if (sender !== key) {
        this._oraNode.sendTo(value, "/" + service, stream)
      }
  }
}


  discover() {
    this._oraNode.sendTo(this._registry.getPeer(), '/ora', 'ping')
  }

  peers() {
    return this._registry.getPeer()
  }

  peerInfo() {
    return this._node.peerInfo
  }

  async start() {

    if (this.hasProvider) {
      await this._provider.start()
    }

    await this._node.start()
    assert(this._node.isStarted(), "Node must be started")
  }

  async stop() {
    if (this.hasProvider) {
      await this._provider.stop()
    }
    await this._node.stop((err) => console.log(err))
  }
}



module.exports = Ora
