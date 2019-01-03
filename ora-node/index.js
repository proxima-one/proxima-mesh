/*
This is the Ora Node, much thanks to the kitsunet project!!!!
*/

const EventEmitter = require('events')
const pify = require('pify')
const assert = require('assert')
const pull = require('pull-stream')
const Libp2p = require('libp2p')
'use strict'

//configuration defaults
const MAX_PEERS = 10
const MAX_PEERS_DISCOVERED = 25
const INTERVAL = 15 * 1000

class OraNode extends EventEmitter {
  constructor({node, maxPeers, updateInterval, maxPeersDiscovered}) {
    assert(node, "There needs to be a defined node")
    super()
    this.node = node


    this.interval = updateInterval || INTERVAL
    this.maxPeersDiscovered = maxPeersDiscovered || MAX_PEERS_DISCOVERED
    this.maxPeers = maxPeers || MAX_PEERS

    this.connected = new Map()
    this.discovered = new Map()
    this.dialing = new Map()



  /*
    Set multiple handlers (this is the only one needed)
*/
  this.node.handle('/ora', (_, conn) => {
    conn.getPeerInfo((err, peerInfo) => {
      if (err) {
        throw err
      }
      this.connected.set(peerInfo.id.toB58String(), peerInfo)
      this.emit('ora:connection', conn)
    })
  })

  //peer connections
    //discovery
    node.on('peer:discovery', (peerInfo) => {
      this.discovered.set(peerInfo.id.toB58String(), peerInfo)

    })

    //connection
    node.on('peer:connect', (peerInfo) => {
      this.connected.set(peerInfo.id.toB58String(), peerInfo)
    })

    //disconnection
    node.on('peer:disconnect', (peerInfo) => {
      this.connected.delete(peerInfo.id.toB58String())
    })

}


/*
  TODO this assumes msg is string, need to allow for other objects/serialized data
*/
async sendTo(peer, proto, msg) {
  assert(this.node.isStarted(), "The node must be started")

  try {
    await pify(this.node.dialProtocol).call(this.node, peer, proto, (error, conn) => {
      if (error) {
        console.log(error)
        //throw error
        return
      }
      var data = JSON.stringify(msg) //TODO fix this
      pull(
        pull.values([data]),
        conn
      )
    })

  } catch (err) {
    console.log(err)
    //throw err
  }
}




}

module.exports = OraNode
