import { utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

export function hashMessage(message) {
  return keccak256(utf8ToBytes(message));
}
