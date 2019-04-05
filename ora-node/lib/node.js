'use strict'

const Libp2p = require('libp2p')
const TCP = require('libp2p-tcp')
const PeerInfo = require('peer-info')
const defaultsDeep = require('@nodeutils/defaults-deep')
const Bootstrap = require('libp2p-railing')
const SECIO = require('libp2p-secio')
const Mplex = require('libp2p-mplex')
const WebSockets = require('libp2p-websockets')


// Default bootstrap
const bootstrapers = [
'/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
'/ip4/104.236.176.52/tcp/4001/ipfs/QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z',
'/ip4/104.236.179.241/tcp/4001/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
'/ip4/162.243.248.213/tcp/4001/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
'/ip4/178.62.61.185/tcp/4001/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
'/ip4/104.236.151.122/tcp/4001/ipfs/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx'
]


class Node extends Libp2p {
  constructor(_options) {
    const peerInfo = _options.peerInfo
    const defaults = {
      modules: {
        transport: [TCP, WebSockets], //WebRTC, UDP, QUIC
        streamMuxer: [Mplex],
        connEncryption: [SECIO],
        peerDiscovery: [Bootstrap]
      },
      config: {
        peerDiscovery: {
          bootstrap: {
            interval: 2000,
            enabled: true,
            list: bootstrapers
          }
        }
      }
    }
    super(defaultsDeep(_options, defaults))
  }





  //Start the node
  start(callback) {
    super.start((err) => {
      if (err) {
        callback(err)
      }
      callback()
    })
  }



  /*
  Stop the node
  */
  stop(callback) {
    super.stop((err) => {
      if (err) {
        callback(err)
      }
      callback()
    })
  }
}

module.exports = Node
