


# Demo

#### Making a decentralized Infura

## Motivation


## Installation

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

### Version
```
ora -v
```

### Help

```
ora -h
```

### Init

```
ora init
```

### Start
```
ora start
```

### Stop
```
ora stop
```

### Info
```
ora info
```

### Peers
```
ora peers
```


## Using Ora in an Application
An Ora node can be used in an application by importing the module.

```
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

### Start the client

On one tab.

```
node clientDemo
```

### Start server

On another.
```
node serverDemo
```

## Results
These two nodes should have a client-server interaction. With one node continuously polling a chain or node, and pushing updates to the other node.


# Potential

Through Ora it becomes possible to only push data to 




## Next Steps

- Dashboard

- Registry

- Service Creation

- Service Discovery

- Integration of plugins
