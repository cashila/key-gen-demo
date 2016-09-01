const chalk = require('chalk');

//
// Ether
//
// https://github.com/ethereumjs/ethereumjs-util/blob/master/index.js
//
const ethUtil = require('ethereumjs-util');
const crypto = require('crypto');
const EthWallet = require('ethereumjs-wallet');
var buffer;

function genEther(buffer) {
  var privateKey = buffer;
  // https://github.com/ethereumjs/ethereumjs-util/blob/master/index.js#L357
  var publicKey = ethUtil.privateToPublic(privateKey);
  // https://github.com/ethereumjs/ethereumjs-util/blob/master/index.js#L345
  var address = ethUtil.publicToAddress(publicKey);
  var wallet = EthWallet.fromPrivateKey(privateKey).toV3String('test');

  console.log(`Private key: ${privateKey.toString('hex')}`)
  console.log(`Public key: ${publicKey.toString('hex')}`)
  console.log(`Address: ${chalk.green( '0x'+address.toString('hex') )}`)
  console.log(`Mist wallet: ${chalk.grey(wallet)}`);
  console.log();
}


console.log(`ETHER (random):`);
buffer = crypto.randomBytes(32); // random 32 bytes
genEther(buffer);

console.log(`ETHER (expected address ${chalk.blue('0x064eccdf9e1e40d8a3acf784cf6df9e862f71469')}):`);
buffer = new Buffer('f274eff1d47d5a9c72f8874f227937ccd937a876bf7815847f76ff7521dfb063', 'hex');
genEther(buffer);

//
// Lisk
//
// https://github.com/LiskHQ/lisk-js/blob/development/lib/transactions/crypto.js
//
const Nacl = require("js-nacl");
const lisk = require('lisk-js');

function genLisk(nacl, buffer) {
  // https://github.com/LiskHQ/lisk-js/blob/development/lib/transactions/crypto.js#L286
  var keyPair = nacl.crypto_sign_keypair_from_seed(buffer);
  var privateKey = new Buffer(keyPair.signSk);
  var publicKey = new Buffer(keyPair.signPk);
  // https://github.com/LiskHQ/lisk-js/blob/development/lib/transactions/crypto.js#L294
  var address = lisk.crypto.getAddress(publicKey);

  console.log(`Private key: ${privateKey.toString('hex')}`);
  console.log(`Public key: ${publicKey.toString('hex')}`);
  console.log(`Address: ${chalk.green( address )}`);
  console.log();
}

Nacl.instantiate(function(nacl) {
  var buffer, seed;

  console.log('LISK (random)');
  buffer = crypto.randomBytes(32);
  genLisk(nacl, buffer);

  console.log(`LISK (expected address ${chalk.blue('12137408304683933905L')})`);
  console.log(`Seed: ${seed}`);
  seed = 'uncle latin swing toilet reform mimic neglect engine brave isolate spatial useless';
  buffer = crypto.createHash("sha256").update(seed, "utf8").digest();
  genLisk(nacl, buffer);
});

