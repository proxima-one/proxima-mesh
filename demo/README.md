


# Demo: Decentralizing Infura

## Overview

Every chain (and service for that matter) needs to have an interaction interface. While centralized projects like Infura fulfill these needs, they do
not get around the issue of bandwidth cost, trust, and sustainability.

For this demo we try to use a blockchain provider to update a set of distributed nodes. While for the moment there is still a centralized provider, it enables lower cost, and allows for easier entrance of other providers (which contributes to decentralization).

Our demo architecture will look something like this:

- Provider: creates data
- Server: reads data and sends to client
- Client: reads data from server

This is merely, a demo, but the end goal will be to have a dynamic list of 'servers' that propagate blocks from providers to clients.
These servers can be selected by picked transaction senders (and having providers send blocks back to all users that send transactions through them as a
  form of validation). This means that updates do not need to be paid for!  And it uses a group of individuals (servers) that have an incentive to
  send blocks.


## Setup

In order to begin this we will need to install Ora and its dependencies.

### Installing Node.js
If you already have npm skip this step. Otherwise you can install node through the follow website: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm


### Installing Ora
Once npm is installed, the package can be installed through the command-line:

```
npm install 'ora'
```

Note: Ora is not yet a package in npm

## Set-up

Now that is done let's create a new project directory and try out the commands for Ora.

```
mkdir ora-app && cd ora-app
```

## Ora Command Line Interface

Once inside our project folder we can try out the Ora CLI

#### Version
```
ora -v
```

#### Help

```
ora -h
```

#### Init

```
ora init
```

#### Start
```
ora start
```

#### Stop
```
ora stop
```

#### Info
```
ora info
```

#### Peers
```
ora peers
```


## Using Ora in an Application
An Ora node can be used in an application by importing the module.

```javascript
const {
  Ora,
  OraFactory
} = require('ora')

```

## Client-Server Demo

We have already constructed a demo of Ora, there are two files:
- clientDemo.js
- serverDemo.js

These stand for a subscriber and a provider (in this case Cardano).

### Start up

On one tab start the client.

```
node clientDemo
```



On another tab start up the server.
```
node serverDemo
```

## Results
These two nodes should have a client-server interaction. With one node continuously polling a chain or node, and pushing updates to the other node.
In this case the result should look something like:

```console
{"cteId":"ee19839c4330f493e804fd21629e320b73a0f52070b9f5c89f3ddd4d6759828d","cteTimeIssued":1546628651,"cteAmount":{"getCoin":"2042172620987"}},{"cteId":"dff238e84c3177f8d6173b31a39552badd90abe6d6f5e02db35bcb90f2f94e56","cteTimeIssued":1546629411,"cteAmount":{"getCoin":"78817828930"}},{"cteId":"8caa6f0f90c6e8fe71c2ca56d322653d0b826c58c1c9aa27137bc4637a072b0a","cteTimeIssued":1546629411,"cteAmount":{"getCoin":"367109718545"}},{"cteId":"9528e392d76ffeb964ac383e9a5fe7c8ba20abbd227c2febc349802b084952fe","cteTimeIssued":1546629851,"cteAmount":{"getCoin":"1000000106671"}},{"cteId":"50f9f5f30cad77c2cd2f63a66e9b5b8b9988d91dbca498169b4c5bfa7e91d751","cteTimeIssued":1546630531,"cteAmount":{"getCoin":"359500372853"}},{"cteId":"b6825fdd8d6812a37f1c4985253319fc52b49473b2ac31591034259ebaa09988","cteTimeIssued":1546630571,"cteAmount":{"getCoin":"2038032064155"}},{"cteId":"50148e300b2099c435b07e4e2235be18bced5d416a10cf002f49dceaa91c5962","cteTimeIssued":1546630891,"cteAmount":{"getCoin":"2038009733511"}},{"cteId":"047ae12d4bad6dfdfac0594400e272d07e8b2f4dc20bf6006966d0049669fe92","cteTimeIssued":1546631051,"cteAmount":{"getCoin":"43871707"}}
```

## Next Steps
Obviously, there are many cool features and functionality that can be added, here are a few that are on the top of our list.

- Provider Integration

- Dashboard

- Registry

- Service Creation

- Service Discovery

- Integration of plugins
