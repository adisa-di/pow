
const jayson = require('jayson');
const mine = require('./mine');
const { PORT } = require('./config');
const {utxos} = require('./db');

// put into file system and import / export it later
const server = jayson.server({
  startMining: function(_, callback) {
    callback(null, 'started!');
    mine.startMining();
  },
  stopMining: function(_, callback) {
    callback(null, 'stopped!');
    mine.stopMining();
  },
  getBalance: function([address], callback) {
    const ourUTXOs = utxos.filter(x => {
      return x.owner === address && !x.spent;
    });
    const sum = ourUTXOs.reduce((p, x) => p + x.amount, 0);
    callback(null, sum);
  }
});

server.http().listen(PORT);

