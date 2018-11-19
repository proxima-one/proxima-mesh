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

### Registering
Ora is needed to be a part of the

## Basic Functions
Once initialized, the client can be

### Connect
The Ora Client can be connected to the service itself through the following.

```javascript
client.connect();
```

Alternatively, the connection can be closed through the following snippet.

```javascript
client.close();
```

### Send Message
Messages can be sent to the



### Subscribe to services
Subscription to the Ora

``javascript
client.subscribe();
```


### Add Event Trigger
At this moment
