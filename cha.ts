import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';
import crypto from 'crypto';

// Convert string to a 32-byte key using SHA-256
function stringToKey(keyString: string): Uint8Array {
  const hash = crypto.createHash('sha256'); // Use SHA-256 to create a 32-byte key
  hash.update(keyString);
  return Uint8Array.from(hash.digest()); // Return the key as Uint8Array
}

// Function to encrypt using ChaCha20-Poly1305
function encryptChaCha20(message: string, key: Uint8Array): { nonce: Uint8Array, encrypted: Uint8Array } {
  const nonce = nacl.randomBytes(nacl.secretbox.nonceLength); // Generate a random nonce
  const messageUint8 = naclUtil.decodeUTF8(message); // Convert message to Uint8Array

  // Encrypt message using the key and nonce
  const encrypted = nacl.secretbox(messageUint8, nonce, key);

  return { nonce, encrypted };
}

// Function to decrypt using ChaCha20-Poly1305
function decryptChaCha20(encrypted: Uint8Array, nonce: Uint8Array, key: Uint8Array): string | null {
  const decrypted = nacl.secretbox.open(encrypted, nonce, key);

  if (!decrypted) {
    console.log("Failed to decrypt.");
    return null;
  }

  return naclUtil.encodeUTF8(decrypted); // Convert Uint8Array back to string
}

// Example usage
const message = "Hello, ChaCha20!";
const stringKey = "mysecretkey123"; // Your string key
const key = stringToKey(stringKey); // Derive 32-byte key from string

// Encrypt the message
const { nonce, encrypted } = encryptChaCha20(message, key);
console.log("Encrypted message:", naclUtil.encodeBase64(encrypted));

// Decrypt the message
const decryptedMessage = decryptChaCha20(encrypted, nonce, stringToKey(stringKey));
console.log("Decrypted message:", decryptedMessage);
