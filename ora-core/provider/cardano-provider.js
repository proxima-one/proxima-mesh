'use strict'

const EventEmitter = require('events')
const sleep = require('system-sleep')
const pify = require('pify')
const axios = require('axios')

class CardanoProvider extends EventEmitter {
  constructor(url) {
    super()
    this.url = url || 'http://cardano-explorer.cardano-mainnet.iohk.io'
    this.interval = 5000
    this.running = false
    /*
      Set-up the event handlers...
      onStart() What do you do? nothing??
    */

    this.on('poll', async () => {
      await this.update()
      this.poll()
    })

  }

  async update() {
      var url = this.url + "/api/txs/last"
      try {
        var response = await axios({
          method: 'get',
          url: url
        })
        this.emit('update', response.data)
    } catch (err) {
      console.log(err)
    }
  }


  async poll() {
    setTimeout(() => {this.emit('poll')}, this.interval)

  }


  isRunning() {
    return this.running;
  }

  async start() {
    this.poll()
  }

  stop() {
    this.running = false
  }

}


module.exports = CardanoProvider
