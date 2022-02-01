
const jayson = require('jayson');
const mine = require('./mine');
const { PORT } = require('./config');

// put into file system and import / export it later
const server = jayson.server({
  startMining: function(_, callback) {
    callback(null, 'started!');
    mine.startMining();
  },
  stopMining: function(_, callback) {
    callback(null, 'stopped!');
    mine.stopMining();
  }
});

server.http().listen(PORT);

