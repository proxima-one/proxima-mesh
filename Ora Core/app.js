

const http = require('http');
const Client = require('./ora-client-js/client');
//var OraOperator = require('operator');

const hostname = '127.0.0.1';
const port = 3000;


var tx = {
  id: '123456',
  service: 'cardano',
  action: 'transaction',
  payload: {
"destinations": [{
  "amount": 14,
  "address": "A7k5bz1QR2...Tx561NNmfF"
}],
"source": {
  "accountIndex": 0,
  "walletId": "Ae2tdPwUPE...8V3AVTnqGZ"
},
"spendingPassword": "5416b2988745725998907addf4613c9b0764f04959030e1b81c603b920a115d0"
}
};


let Ora = Client();
console.log("client made ");
//console.log("client public key: " + Ora.key.public_key + " Client private key: " + Ora.key.private_key);
Ora.connect();
console.log("Client connecting");
Ora.register();
console.log("Client registering");
//must be registered
//Ora.sendMessage(Ora.address, "cardano-event-requested-client", tx);
//console.log("Client sending message");








//How do you ensure that operators will not double send Transactions


/* they should be subscribing to their own user stream

*/


//constant subscription

//brokers own the streams
