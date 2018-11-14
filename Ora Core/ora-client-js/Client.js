
const config = require('./const');
const Elliptic = require('elliptic').ec; //this needs to be fixed
var EventStoreClient = require('event-store-client');
//var OraConnector = require('./oraconnector');

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




/// These are the data types

    Event {
    Id: unique event id
    Stream: the stream that event is published to
    Service: service that event is using
    Type: type of event for the process
    Payload: the data being sent in the message
    Prev: reference event,
    Sign: signature of the event by the publisher
    Meta: any other metadata tags (for instance process, whether it can be disputed, etc)
    }



    Participant {
    System Clout: this will be the reputation of the participant in the Ora ecosystem
    Stream: this will be the stream that the user writes to.
    Public key:  this will act as the identifier of the user on the Ora network
    Private key: this will be used to sign events, and govern the user stream
    Service Subscriptions: this will be the aggregate and service pathway for updates from the service
    Plugins: this will be code snippets intended to be triggers for events from services
    }


  */

  // Key generation
  //const key = Elliptic.genKeyPair();

  //Create public_key private key for Ora Client
  //const public_key = key.publicKey;
  //const private_key = key.privateKey;

  //the event types might overlap
  /*
  This should be a struct, should be able to reload this from anything
  */


  this.plugins = {};
  //plugins and triggers should be preserved

  this.triggers = {}; // this is meant to be a dictionary
    //(type, plug-in) (listening to streams??)

   //should these be loaded up from the start??

  //TODO Create private and public key for the Ora API (...)\
  //const name = '';
  //const public_api_key = '';
  //const private_api_key = '';

  //TODO Connection needs to be fixed
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
  //message must be packaged into an event
  //room for metadata
  var event = toEvent(EventStoreClient.Connection.createGuid(), type, message);
  this.sendEvent(stream, event); //needs to have an await function
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
  var register_message = 'streamName';//this.public_key;
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
  console.log(trigger);
  console.log(this.triggers[stream]);
}

function toEvent(id, type, message, meta = {}) {
  return {
    eventId : id,
    eventType: type,
    data: message,
    metadata: meta
  };
}











function closeIfDone() {
    if (written && read && readMissing) {
        console.log("All done!");
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
