
const config = require('./const');
var EventStoreClient = require('event-store-client');

'use strict';

/*

this should be the client constructor, it will construct a client
*/

function Client(key, options = {}) {
  if (!(this instanceof Client)) {
    return new Client(args);
  }

  this.plugins = {}; //plugins and triggers should be preserved
  this.triggers = {}; // this is meant to be a dictionary

  //Check this key 
  //want to have this initialized off environoment vars
  const public_api_key = key.publicKey || config.publicKey;
  const private_api_key = key.privateKey || config.privateKey;

  // Subscribe to receive statistics events (Credentials need to be made to reflect pub/priv keys)
  this.credentials = config.credentials;

  this.connection = null;

  this.options = {
    host: config.address,
    port: config.port,
    debug: config.debug
  };

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
  var event = toEvent(EventStoreClient.Connection.createGuid(), type, message);
  this.sendEvent(stream, event);
};


/*
After the event is sent there needs to be some type of check for the responses
*/
Client.prototype.sendEvent = function(stream, event, options = {}) {
  var events = [event];
  this.connection.writeEvents(stream, EventStoreClient.ExpectedVersion.Any, false, events, this.credentials, function(completed) {
      console.log('Events written result: ' + EventStoreClient.OperationResult.getName(completed.result));
  });
};



/*
Register client
*/
Client.prototype.register = function(options = {}) {
  var register_message = this.publicKey; //this.public_key;
  var register_type = 'register-request';
  var register_stream = 'registry';
  var event = toEvent(EventStoreClient.Connection.createGuid(), register_type, register_message);
  this.sendEvent(register_stream, event);
};

/*
TODO This needs to be fixed such that a variety of listeners can be handled
*/
Client.prototype.subscribe = function(stream, options = {}) {
  // Just gives you the information
  var correlationId = this.connection.subscribeToStream(stream, true,
     this.triggers[stream], onSubscriptionConfirmed,
    onSubscriptionDropped, this.credentials, onSubscriptionNotHandled);
};


/*
This will add the event triggers ...
*/
Client.prototype.addEventTrigger = function(stream, trigger) {
  this.triggers[stream] = trigger;
}


//should be lifted out
function toEvent(id, type, message, meta = {}) {
  return {
    eventId : id,
    eventType: type,
    data: message,
    metadata: meta
  };
}


function close() {
    if (this.connection) {
        connection.close();
    }
}

function onSubscriptionConfirmed(confirmation) {
    console.log("Subscription confirmed (last commit " + confirmation.lastCommitPosition + ", last event " + confirmation.lastEventNumber + ")");
}

function onSubscriptionDropped(dropped) {
    var reason = dropped.reason;
    switch (dropped.reason) {
        case 0:
            reason = "unsubscribed";
            break;
        case 1:
            reason = "access denied";
            break;
    }
    console.log("Subscription dropped (" + reason + ")");
}

function onSubscriptionNotHandled(notHandled) {
    var reason = notHandled.reason;
    switch (notHandled.reason) {
        case 0:
            reason = "not ready - retry subscribing"
            break;
        case 1:
            reason = "too busy - retry subscribing"
            break;
        case 2:
            reason = "not master - reconnect to master node"
            break;
    }
  }

module.exports = Client;
