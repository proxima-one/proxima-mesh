#!/usr/bin/env node
const program = require('commander')
//const Ora = require('ora-core')
const Ora = require('../ora-core/ora-factory')
const chalk = require('chalk');
const utils = require('../ora-core/utils')

/*
Create a new client
*/

const clientAddresses = ['/ip4/0.0.0.0/tcp/5900']
const clientIdentity = utils.testClient




let oraNode


//Set version
program.version('0.0.1', '-v, --version')


/*
  init

  Create a new Ora node
    -- Flag f: New init file
    Default is config.json

*/
program
  .command('init')
  .action(function (cmd) {
    console.log(chalk.green('Initializing a new Ora Node.... '))
    console.log(chalk.green('.... '))
    console.log(chalk.green('.... '))
    console.log(chalk.green('.... '))
    console.log(chalk.green('Completed'))
    //TODO create the secret key
    init()
})



/*
  start

  Start an Ora node
    -- Flag d: detached
*/
program
  .command('start')
  .action(function (cmd) {

    console.log(chalk.green('Starting a new Ora Node.... '))
    start()
    //TODO detached
})



/*
  stop

  Stop an Ora node
*/
program
  .command('stop')
  .action(function (cmd) {
    console.log(chalk.red('Stopping your Ora Node.... '))
    stop()
})




/*
  peers

  Get list of peers
*/
program
  .command('peers')
  .action(function (cmd) {

    console.log('Ora node peers')
    peers()


})



/*
  info

  Get node information
*/
program
  .command('info')
    .action(function (cmd) {

      console.log(chalk.blue("Node information "))
      info()
})




async function init() {
  oraNode = await Ora({identity : clientIdentity, addresses: clientAddresses, options: {provider: false}})
}


async function start() {
  await init()
 oraNode.ora.start()
}

async function stop() {
 oraNode.ora.stop()
}

async function peers() {
    await init()
    console.log(chalk.cyan(oraNode.ora.peers()))
}



async function info() {
    await init()
    console.log(chalk.green(JSON.stringify(oraNode.node.peerInfo)))
}



//ending
program.parse(process.argv)
