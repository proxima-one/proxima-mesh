
/*
This is the complete version will include:

 - Storage/Cache
 - Plugins
 - Providers

 - Needs to start, stop, dial, connect, store
 - Just the data not the functions
*/

const OraNode = require('ora-node').node
const assert = require('assert')
const pify = require('pify')
const Parallel = require('async-parallel')
const async = require('async')
const pull  = require('pull-stream')
const EventEmitter = require('events')



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

      /*
        1) parse data from connection
        2) determine if data is correct
        3) use appropriate client
      */
      conn.getPeerInfo((err, peerInfo) => {
        if (err) {
          throw err
        }
        this._node.connected.set(peerInfo.id.toB58String(), peerInfo)
        this._oraNode.emit('cardano:connection', conn)
      })

    })

    this._node.handle('/cardano', (_, conn) => {
      /*
        -- Add to registry (If not in registry)

      */
      this._oraNode.emit('cardano:connection', conn)

      conn.getPeerInfo((err, peerInfo) => {
        if (err) {
          throw err
        }
        //console.log(peerInfo)
        //console.log(this._node)
        this._oraNode.connected.set(peerInfo.id.toB58String(), peerInfo)
      })
    })


    if (_options.provider) {
      this.hasProvider = true
      this._provider = _options.provider



      this._provider.on('update', (data) => {
        const peer = this._registry.getPeer()
        var stream = data
        var data = JSON.stringify(data)
        this._oraNode.sendTo(peer, '/cardano', stream)
        this.emit('update', data)
      })
    }


    this._oraNode.on('cardano:connection', (conn) => {
      /*
        -- TODO Parse data (RPC)

      */

        pull(
          conn,
          pull.collect((err, data) => {
                console.log(data.toString())
                this.emit('update', data)
          }
        )
      )

    })

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
