
var EventStoreClient = require('event-store-client');
const consts = require('./const');
const tools = require('/c'); //
const Client = require('./'); //
 //create protobuff
 //fix the ..
'use strict';


//Create new ora client
function ora(options = {})  {

  //create key from private or generate
  let key = tools.crypto.Key({
    privateKey: options.privateKey,
  });




  //Ora client is created using options and the configurations
  let client = {};



  return client;
}

module.exports = ora;
