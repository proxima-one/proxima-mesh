
var EventStoreClient = require('event-store-client');
const config = require('./const');
'use strict';


var options = {
  host: config.address,
  port: config.port,
  debug: config.debug
};

function connect(options) {

  connection = new EventStoreClient.Connection(options);


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
    console.log("Subscription not handled (" + reason + ")");
}



module.exports = OraConnector;
