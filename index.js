const Blockchain = require('./models/Blockchain');
const Block = require('./models/Block');

// put into file system and import / export it later
const db = {
  blockchain: new Blockchain()
}

function mine() {
  db.blockchain.addBlock(new Block());

  console.log(db.blockchain.blockHeight());

  // heartbeat
  setTimeout(mine, 5000);
}

mine();

