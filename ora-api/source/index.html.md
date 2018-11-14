---
title: Ora API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - json

includes:

search: true
---

# Introduction
This API documentation is meant to give developers the ability to use the
Ora Client. The library is made to be simple and easy to use to allow for
fast development and deployment.

This documentation is enabled through the use of [slate](https://github.com/lord/slate).

# Ora Client
The Ora Light Client can be used as an endpoint by any client. This can allow for
a malleable base structure. Currently, there are no client plug-ins for the Ora Client.
This means that the only available operations are system operations.



## Installing the Ora Client

The Ora Client for javascript can be installed as an npm package. This enables one to set-up a client, and use that client in javascript code.

<code> npm install ora-client <code>

## Initializing the client

The Ora client can then be initialized directly in the javascript code, or through the command line.


### Command Line

To create a new client, simply run:

<code>ora-client init new <code>

The response should be in the command, with the public key and private key being added to the environment variables of your application.

(Response)

Once the client is created it can be started by referencing the environment variables.





### Javascript
The client can be added and initialized via javascript



## Client Actions

### Subscribe
This is the action for subscribing to different services. The default
subscriptions for each Ora Client are disputes and the registry service. Further subscriptions can be found through the registry, and updated by actions to the registry.

<code>  <code>

<response>




### Connect
The connection for the Ora Client is currently maintained centrally

### Register
This is the first system operation and works as an extension of the

### Dispute

### Trigger

### Create Event ???

### 


# Ora Services

## Registry

## Disputes




# Services
Services

## Subscribing to new services

## Creating services







### Disputes
Disputes enable clients to push issues with transactions and requests to the Ora Network.
These disputes are handled by the Ora Client itself, and reference the service and event
transaction of the dispute in question.

# Commands
Ora Client Operations are packaged into generalized commands.
Commands can be specific to services and chains. This generalization allows for easy
reuse and powerful extensions.


> A command can be represented through the following JSON:

```json
  {
  "id": UID,
  "service": CHAIN,
  "action": ACTION,
  "data": ACTION_PAYLOAD
  }

```

Attribute |  Description
--------- |  -----------
id | This will be a unique identifier for the command, initially the id will be the transaction hash
service | This is the chain or service that the command is being sent for
action | This will identify the specific action being done
data | The payload used for the action

Commands can be used on the Ora Client as a form of wrapper for transactions and subscriptions.
Commands are then sent through the Ora network. Once a command is pushed to Ora, the client will be notified of
updates until the command cycle is completed.

## Transactions
Transactions are chain-specifc operations that enable the transfer of assets on the blockchain. Transactions, and all actions,
must be validated by the client itself.

> A transaction is chain-specific, but here is an example payload for Cardano thanks to its API:

```json
{
"destinations": [{
  "amount": 14,
  "address": "A7k5bz1QR2...Tx561NNmfF"
}],
"source": {
  "accountIndex": 0,
  "walletId": "Ae2tdPwUPE...8V3AVTnqGZ"
},
"spendingPassword": "5416b2988745725998907addf4613c9b0764f04959030e1b81c603b920a115d0"
}

```

## Subscriptions
Subscriptions allow for the tracking of specific addresses on a chain through updates from the
chain itself rather than from repeated requests. This subscriptions an be made for different addresses on different chains.

> A transaction is chain-specific, but here is an example transaction for Cardano:

```json
  {
  "id": UID,
  "service": CHAIN,
  "accounts" : [accounts]
  }

```




# Client Plug-ins
The Ora Client is made intentionally light-weight, but plug-ins and additions can be made to
support different chains and services. Plug-ins for chains can be integrated with the client and implement
validation and routing protocols for the services they provide. Operations within the client must be validated,
this can be done through merkle trees and light clients.

### In progress

# Wallet Integration
The next step for the Ora Client is to provide easy-to-use wallet integration to enable
platforms to integrate with the client itself under their own white-label.

### TODO

# Further Work

### TODO
