
const ora = require('../lib/ora');


var client = ora();

client.connect();
client.register();
client.subscribe('registry');
