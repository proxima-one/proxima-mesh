const Ora = require('../ora-factory')
const  utils = require('../utils')


const clientAddresses = ['/ip4/0.0.0.0/tcp/5900']
const clientIdentity = utils.testClient
async function main() {
  const {
  ora,
  node
 } = await Ora({identity : clientIdentity, addresses: clientAddresses, options: {provider: false}})

console.log("Starting client")
 ora.start()
}


main()
