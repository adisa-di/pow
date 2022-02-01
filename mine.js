const Block = require('./models/Block');
const Transaction = require('./models/Transaction');
const UTXO = require('./models/UTXO');
const { PUBLIC_KEY } = require('./config');
const db = require('./db');
const TARGET_DIFFICULTY = BigInt("0x0" + "F".repeat(63));
const BLOCK_REWARD = 10;

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

  // TODO: add transactions from the mempool
  const coinbaseUTXO = new UTXO(PUBLIC_KEY, BLOCK_REWARD);
  const coninbaseTrnx = new Transaction([], [coinbaseUTXO]);

  block.addTransaction(coninbaseTrnx);

  // proof of work
  while(BigInt('0x' + block.hash()) >= TARGET_DIFFICULTY) {
    block.nonce++;
  }

  block.execute();

  db.blockchain.addBlock(block);
  console.log(db.blockchain.blockHeight() + ` with hash of ${block.hash()}`);

  // heartbeat
  setTimeout(mine, 2500);
}

module.exports = {
  startMining,
  stopMining
};