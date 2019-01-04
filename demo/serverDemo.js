const Ora = require('../ora-core/ora-factory')
const  utils = require('./utils')


const serverAddresses = ['/ip4/0.0.0.0/tcp/4900']
const serverIdentity = utils.testServer
async function main() {
const {
  ora,
  node
} = await Ora({identity : serverIdentity, addresses: serverAddresses, options: {provider: true}})

console.log("Starting server")

ora.start()
}


main()
