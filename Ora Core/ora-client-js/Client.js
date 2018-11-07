
const config = require('./const');
const Elliptic = require('elliptic'); //this needs to be fixed
var OraConnector = require('./oraconnector');

'use strict';


/*

this should be the client constructor, it will construct a client key
*/
function Client(args = {}) {

  if (!(this instanceof Client)) {
    return new Client(args);
  }

  /*
    TODO
    - Key generation from private keys
    - HDK gen
    - Privacy

  */

  // Key generation
  const key = Elliptic.ec.genKeyGen();

  //Create public_key private key for Ora Client
  const public_key = key.publicKey;
  const private_key = key.privateKey;

  //TODO Create private and public key for the Ora API (...)\
  //const name = '';
  //const public_api_key = '';
  //const private_api_key = '';

  // Subscribe to receive statistics events (Credentials need to be made to reflect pub/priv keys)
  this.credentials = config.credentials;
  this.connection = null;

};

/*
The client should establish a connection with the Ora Network
*/
Client.prototype.connect = function() {
  this.connection = new EventStoreClient.Connection(this.options);
};


/*
The Client sends a message to a stream, with a specific type
*/
Client.prototype.sendMessage = function(stream, type, message, options = {}) {
  //message must be packaged into an event
  //room for metadata
  var event = toEvent(EventStoreClient.Connection.createGuid(), type, message);
  this.sendEvent(stream, event);
  //maybe need acknowledgement

};


/*
After the event is sent there needs to be some type of check for the responses
*/
Client.prototype.sendEvent = function(stream, event) {
  var events = [event];
  this.connection.writeEvents(stream, EventStoreClient.ExpectedVersion.Any, false, events, this.credentials, function(completed) {
      console.log('Events written result: ' + EventStoreClient.OperationResult.getName(completed.result));
      written = true;
  });
};



/*
Register client
*/
Client.prototype.register = function() {
  var register_message = this.public_key;
  var register_stream = 'register-request';
  var event = toEvent(EventStoreClient.Connection.createGuid(), register_stream, register_message);
  this.sendEvent(register_stream, event);
};



/*
TODO This needs to be fixed such that a variety of listeners can be handled 
*/
Client.prototype.subscribe = function(stream) {
  // Just gives you the information
  var correlationId = this.connection.subscribeToStream(streamId, true, function(streamEvent) {
    console.log(streamEvent.eventType);
  }, onSubscriptionConfirmed, onSubscriptionDropped, credentials, onSubscriptionNotHandled);
};


function toEvent(id, type, message, meta = {}) {
  return {
    eventId : id,
    eventType: type,
    data: message,
    metadata: meta
  };
}





module.exports = Client;
