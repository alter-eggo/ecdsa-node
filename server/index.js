const express = require("express");
const app = express();
const cors = require("cors");
const secp = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

function hashMessage(message) {
  return keccak256(utf8ToBytes(message));
}

const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04fd5936a16e69e6cc6edd3534ab1627cb477412494d5010797a99c74e84068b44440b5e2124ddf9ad109dbc4a37bd9ea604849ef5afd4b966b46aba6f4e71c4ca": 100,
  "04a9312f1ab91eb911fab53017e6fcc84bd09dd052f179a32a6a8c16459db9964136df7969eaf6391f61d8c631b0d06c7e86887687d63772fdc910c5bc0d78d7b5": 50,
  "04a02cd4184730c4dd7dd37752c8c4ab7b4a354fb0126002c5e2d2f4c1fc60571083b95af9dad4e60ead3a0c30bcae2e714a10812171855ed99acd92dcfd9bd94b": 75,
};

const msgHash = toHex(hashMessage("Anastasios"));

app.get("/balance/:address", (req, res) => {
  console.log(req.params);
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { recipient, amount, signature, recoveryBit } = req.body;

  const publicKey = secp.recoverPublicKey(msgHash, signature, recoveryBit);

  const sender = toHex(publicKey);
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
