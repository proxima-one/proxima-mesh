
/*
Constructs an Ora instance
*/

const oraLib = require('../ora-node').lib
const Ora = require('./ora')
const assert = require('assert')
const Libp2p = require('libp2p')
const CardanoProvider = require('./provider/cardano-provider')  //TODO
//const Registry = require('ora-registry')
const Registry = require('../registry')



'use strict'

module.exports = async function({identity, addresses, options }) {
  const node = await oraLib.createNode({identity, addrs: addresses})

  const registry = new Registry()
  assert(node, "Node needs to be defined")
  const defaults = {registry: registry}
  if (options.provider) {
    const cardanoProvider = new CardanoProvider('')
    defaults.provider = cardanoProvider
  }

  const ora = new Ora(node, defaults)
  //function set
  return {ora, node}


}
