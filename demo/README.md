


# Demo

#### Making a decentralized Infura

## Motivation




# Potential

Through Ora, it becomes possible to only push data to




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
In this case the result should look something like:

'''
{"cteId":"ee19839c4330f493e804fd21629e320b73a0f52070b9f5c89f3ddd4d6759828d","cteTimeIssued":1546628651,"cteAmount":{"getCoin":"2042172620987"}},{"cteId":"dff238e84c3177f8d6173b31a39552badd90abe6d6f5e02db35bcb90f2f94e56","cteTimeIssued":1546629411,"cteAmount":{"getCoin":"78817828930"}},{"cteId":"8caa6f0f90c6e8fe71c2ca56d322653d0b826c58c1c9aa27137bc4637a072b0a","cteTimeIssued":1546629411,"cteAmount":{"getCoin":"367109718545"}},{"cteId":"9528e392d76ffeb964ac383e9a5fe7c8ba20abbd227c2febc349802b084952fe","cteTimeIssued":1546629851,"cteAmount":{"getCoin":"1000000106671"}},{"cteId":"50f9f5f30cad77c2cd2f63a66e9b5b8b9988d91dbca498169b4c5bfa7e91d751","cteTimeIssued":1546630531,"cteAmount":{"getCoin":"359500372853"}},{"cteId":"b6825fdd8d6812a37f1c4985253319fc52b49473b2ac31591034259ebaa09988","cteTimeIssued":1546630571,"cteAmount":{"getCoin":"2038032064155"}},{"cteId":"50148e300b2099c435b07e4e2235be18bced5d416a10cf002f49dceaa91c5962","cteTimeIssued":1546630891,"cteAmount":{"getCoin":"2038009733511"}},{"cteId":"047ae12d4bad6dfdfac0594400e272d07e8b2f4dc20bf6006966d0049669fe92","cteTimeIssued":1546631051,"cteAmount":{"getCoin":"43871707"}},{"cteId":"0f0ff671ea25d2727177c6891dc93b01d4e053e9ecaecc53c0eb8f201fabf19e","cteTimeIssued":1546631091,"cteAmount":{"getCoin":"367067660719"}},{"cteId":"815c48ce7e2315cecdc3f729259f14c28e3614bbf737ff2e42fc5796ec0d2858","cteTimeIssued":1546631171,"cteAmount":{"getCoin":"8683709690"}},{"cteId":"809b434c2642110a443a778414fa6f003974ad29657c9d4c5f7baff3223bb673","cteTimeIssued":1546631171,"cteAmount":{"getCoin":"999731532"}},{"cteId":"8b9d4d34f534a799fc7c384a4955c5a211ee2bbe9726e4bee719368bd328d15e","cteTimeIssued":1546631211,"cteAmount":{"getCoin":"2036758016821"}},{"cteId":"85e7052df09679f8fc76e467cdcce4b84c6f6bb44cb17a446636f5891e90dc41","cteTimeIssued":1546631211,"cteAmount":{"getCoin":"594164302"}},{"cteId":"0acb31d48d962e1987b7d499284d665496c1dc84d772c9bdcf8d8be3ec91e2d2","cteTimeIssued":1546631211,"cteAmount":{"getCoin":"367066563112"}},{"cteId":"02e1ab957fff44b9c24bc38729b5e53a13c1e5eb109fdd25d50ed88a35c6f446","cteTimeIssued":1546631251,"cteAmount":{"getCoin":"315198708462"}}
'''


## Next Steps

- Dashboard

- Registry

- Service Creation

- Service Discovery

- Integration of plugins
