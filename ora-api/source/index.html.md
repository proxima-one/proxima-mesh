---
title: Ora API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - shell
  - ruby
  - python
  - javascript

includes:
  - errors

search: true
---

# Introduction

This API documentation is meant to give developers the ability to use the Ora Client API. The library is made to be simple and easy to use to allow for fast development and deployment.

# Getting Started

## Setting up a Developer Account
Before interacting with Ora, it is necessary to have an API key, in the initial stages this will not be required, but as the implementation
progresses keys will be given.
Once you login in you can create a create a Developer API Key through which it is
possible to interact with the platform.

The Client API Key looks like the following:

`Ora Client API Key: ORA_CLIENT_PUB_KEY`

### Ora Light Client API


## Commands

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
id | This will be a unique identifier for the command
service | This is the chain or service that the command is being sent for
action | This will identify the specific action being done
data | The payload used for the action



# Transaction


# Request
