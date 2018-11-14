//protected streams (anyone can read and write to them with API)
  //Registry
    //New Stream/User (this is the subscription)
    //New Aggregate
  //Disputes
//brokers make new streams ... ( with users)
  //Stream created event (setting write and read to specific api access)
  //Process Id


//Node

const Client = require('../ora-client-js/client');
//I want to set up an event store with the category of protected (stream category)
//The event store will be hosted on the cloud, and have admins and users
  //Admins will have read and write privileges
  //Users will have read only privileges, except for the registry
  //

let operator = Client();
operator.addEventTrigger('registry', registerRequests);
operator.connect();
operator.subscribe('registry');


function registerRequests(event) {
//TODO validate transaction

//TODO create stream

//TODO write event to stream
  console.log('Accepting registration');
  if (event.eventType == 'register-request') {
    operator.sendMessage('registry', 'accepted', event.data);
  }
}
