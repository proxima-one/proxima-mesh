const Ora = require('../ora-core/ora-factory')
const  utils = require('./utils')


const clientAddresses = ['/ip4/0.0.0.0/tcp/0']
async function main() {
  const {
  ora,
  node
 } = await Ora({addresses: clientAddresses, options: {provider: false}})

console.log("Client")
console.log("Starting node...")
console.log(ora.peerInfo().id.toB58String())
console.log('...')
console.log('...')
console.log("Running")
 await ora.start()
 await ora.discover()
}

main()
