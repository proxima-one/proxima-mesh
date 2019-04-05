const Ora = require('../ora-core/ora-factory')
const  utils = require('./utils')
const CardanoProvider = require('../ora-core/provider/cardano-provider');


const serverAddresses = ['/ip4/0.0.0.0/tcp/4900']
const serverIdentity = utils.testServer
async function main() {
const {
  ora,
  node
} = await Ora({identity : serverIdentity, addresses: serverAddresses, options: {provider: true}})


console.log("Server")
console.log("Starting node...")
console.log(ora.peerInfo().id.toB58String())
console.log('...')
console.log('...')
console.log("Running")
ora.start()
ora.addService('cardano', "");

let car = new CardanoProvider();
car.start()
car.on('update', (data) => {
  //this is where I need protobufs
  var service = 'cardano';
  var action = 'put';
  var data = {
    key: 'key',
    value: 'value'
  };
  let msg = {service: service , action: action, data: data}
  ora.emit('update','cardano', JSON.stringify(msg), "")}
)
}


main()
