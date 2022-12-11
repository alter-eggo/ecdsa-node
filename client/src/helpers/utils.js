import { keccak256 } from "ethereum-cryptography/keccak";

export function getAddress(publicKey) {
  return keccak256(publicKey.slice(1)).slice(-20);
}
