
var EventStoreClient = require('event-store-client');
const consts = require('./const');
const Key = require('./tools/key'); //
const Client = require('./client'); //
 //create protobuff
 //fix the ..
'use strict';

//Create new ora client
function ora(options = {})  {
  //create key from private or generate
  let key = Key({
    privateKey: options.privateKey,
  });
  console.log("Public Key: " + key.publicKey);
  console.log("Private Key: " + key.privateKey);

  //TODO Ora client is created using options and the configurations
  let client = Client(key);

  client.addEventTrigger('registry', function(event) {
    console.log(event.eventType); // this will be the registry plug in
  });

  return client;
}

module.exports = ora;
