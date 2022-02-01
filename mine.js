const Block = require('./models/Block');
const db = require('./db');
const TARGET_DIFFICULTY = BigInt("0x0" + "F".repeat(63));

let mining = false;

function startMining() {
  mining = true;
  mine();
}

function stopMining() {
  mining = false;
}

function mine() {
  if (!mining) return;

  // find hash below target difficulty 
  let block = new Block();

  // proof of work
  while(BigInt('0x' + block.hash()) >= TARGET_DIFFICULTY) {
    // console.log(block.hash());
    block.nonce++;
  }

  db.blockchain.addBlock(block);
  console.log(db.blockchain.blockHeight() + ` with hash of ${block.hash()}`);

  // heartbeat
  setTimeout(mine, 5000);
}

module.exports = {
  startMining,
  stopMining
};