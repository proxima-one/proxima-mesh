'use strict'
const pify = require('pify')
const PeerInfo = require('peer-info')
const PeerId = require('peer-id')
const waterfall = require('async/waterfall')
const Node = require('./node')
const Libp2p = require('libp2p')



const WS = require('libp2p-websockets')
const TCP = require('libp2p-tcp')
const MDNS = require('libp2p-mdns')
const Bootstrap = require('libp2p-bootstrap')

const assert = require('assert')

async function createNode({identity, addrs, bootstrap}) {
  let id = {}
  const privKey = identity && identity.privKey ? identity.privKey : null
  if (!privKey) {
    id = await pify(PeerId).create()
  } else {
    id = await pify(PeerId).createFromJSON(identity)
  }

  const peerInfo = await pify(PeerInfo).create(id)

  //add addresses
  if (!Array.isArray(addrs)) {
    addrs = [addrs]
  }
  addrs.forEach((addr) => peerInfo.multiaddrs.add(addr))
  //console.log(peerInfo.multiaddrs)
  //create Node
  const node = new Node({peerInfo: peerInfo})

  return node
}


// make this a promise-based to enable awaiting of values, and make it based on values
function startNode(addrs, config, callback) {
    if (!Array.isArray(addrs)) {
      addrs = [addrs]
    }
    let node
    waterfall([
      (cb) => PeerId.createFromJSON(require(config), cb),
      (id, cb) => PeerInfo.create(id, cb),
      (peerInfo, cb) => {
        addrs.forEach((addr) => peerInfo.multiaddrs.add(addr))
        node = new Node({ peerInfo: peerInfo })
        node.start(cb)
      }
    ], (err) => callback(err, node))
}


module.exports = {createNode, startNode}
