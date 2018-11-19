# Ora Client

The Ora Client is meant to be an example for how the Ora Client can be utilized to register
for the Ora service. For further information visit the Ora website at https://wwww.orachain.io.

## Installing the Ora JS Client
The Ora Client can be installed for NodeJs as an npm package.

```
npm install ora-client
```

## Ora Client Set up

The Ora Client can be set up in a node application by importing and initializing it.

```javascript
const Ora = require('ora-client');
var client = Ora();
```

### Registering with the Ora Service
In order to gain access to Ora, it is necessary to register for the Ora service, this
places the participant on the Ora registry and gives them access to other streams.
Registering can be done as follows.

```javascript
client.register();
```

## Basic Functions
Once initialized, the client can use a variety of different functions.

### Connect
The Ora Client can be connected to the service itself through the following.

```javascript
client.connect();
```

### Close
Alternatively, the connection can be closed through the following snippet.

```javascript
client.close();
```

### Send Message
Messages can be sent through the Ora service. It should be noted that
streams can only be written to if the writer has the proper access. 

#### Schema
```
sendMessage(stream, type, message, options = {})
```

name | type | description
--- | --- | ---
stream | String |  the name of the service being subscribed to
type | String | the type of event that is being processed
message | Text | the text sent to the stream

#### Example

```javascript
client.sendMessage('my-app', 'user-created', 'username: satoshi' );
```

### Subscribe to services
Subscriptions to services enables message updates, as well as a variety of other projections.

#### Schema
```
subscribe(string serviceName)
```

name | type | description
--- | --- | ---
serviceName | String | the name of the service being subscribed to

#### Example
An example of this can be shown when subscribing to the Ora registry service.

```javascript
client.subscribe('registry');
```

### Add Event Trigger
At this moment event triggers are used to interact with the service stream subscriptions.

```
addEventTrigger(string serviceName)
```

#### Schema

name | type | description
--- | --- | ---
serviceName | String | the name of the service that the trigger is attached to
trigger | function | the function that handles the incoming events

#### Example
This is a simple example that is attached to the registry service and outputs the type of every new event.

```javascript
client.addEventTrigger('registry', function(event) {console.log("New event of type: " + event.eventType)};);
```
