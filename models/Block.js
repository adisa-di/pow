const sha256 = require('crypto-js/sha256');

class Block {
  constructor() {
    this.timestamp = Date.now();
    this.nonce = 0;
  }

  hash() {
    return sha256(this.timestamp + "" + this.nonce).toString();
  }
}

module.exports = Block;