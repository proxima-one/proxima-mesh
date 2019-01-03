

const Ora = require('./ora-factory')
const  utils = require('./utils')


const clientAddresses = ['/ip4/0.0.0.0/tcp/5900']


const serverAddresses = ['/ip4/0.0.0.0/tcp/4900']

const {
  ora,
  node
} = Ora({identity, addresses})


//in parallel
