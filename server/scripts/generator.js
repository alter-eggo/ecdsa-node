const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

function generateRandomPrivateKey() {
  return secp.utils.randomPrivateKey();
}

function generatePublicKey(privateKey) {
  return secp.getPublicKey(privateKey);
}

const privateKey = generateRandomPrivateKey();
const publicKey = generatePublicKey(privateKey);

console.log(toHex(privateKey));
console.log(toHex(publicKey));
