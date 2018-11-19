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



# Architectural Components
While these components are not utilized strictly with the

### Disputes
Disputes enable clients to push issues with transactions and requests to the Ora Network.
These disputes are handled by the Ora Client itself, and reference the service and event
transaction of the dispute in question.


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
