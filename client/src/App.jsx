import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("98d7880dca7e1950a6a9dd049e3415ff590b47353f67b0a6b97db963d45ac13b");
  const [publicKey, setPublicKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        setPublicKey={setPublicKey}
        publicKey={publicKey}
      />
      <Transfer
        setBalance={setBalance}
        address={address}
        publicKey={publicKey}
        privateKey={privateKey}
      />
    </div>
  );
}

export default App;
