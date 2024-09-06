// Import the required module
import CryptoJS from 'crypto-js';

// Fungsi untuk melakukan enkripsi dengan Blowfish
function encryptBlowfish(message: string, key: string): string {
    const encrypted = CryptoJS.Blowfish.encrypt(message, key);
    return encrypted.toString();
}

// Fungsi untuk melakukan dekripsi dengan Blowfish
function decryptBlowfish(cipherText: string, key: string): string {
    const decrypted = CryptoJS.Blowfish.decrypt(cipherText, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
}

// Contoh penggunaan
const message = "Pesan rahasia";
const key = "ebas123467kjndsfoiwnmsfodjpb 9uio4hjrt0i3wnfkjlwe nf90oijerofn eriojfg neroipgfneroipfgneorjkgfneropifgj0owemfkmwedn oiew oi weoirjweoirjwe0iorf jweoiprj";

// Enkripsi
const encryptedMessage = encryptBlowfish(message, key);
console.log("Pesan terenkripsi:", encryptedMessage);

// Dekripsi
const decryptedMessage = decryptBlowfish(encryptedMessage, key);
console.log("Pesan asli setelah dekripsi:", decryptedMessage);
