const encoder = new TextEncoder();
const decoder = new TextDecoder();
const ITERATIONS = 310_000;

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return btoa(binary);
}
function fromBase64(value: string): Uint8Array {
  const binary = atob(value);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const material = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" },
    material, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]
  );
}
export async function encryptObject(value: unknown, password: string) {
  if (!password || password.length < 10) throw new Error("Use a password of at least 10 characters.");
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);
  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoder.encode(JSON.stringify(value)));
  return { salt: toBase64(salt), iv: toBase64(iv), ciphertext: toBase64(new Uint8Array(ciphertext)) };
}
export async function decryptObject<T>(record: { salt: string; iv: string; ciphertext: string }, password: string): Promise<T> {
  const key = await deriveKey(password, fromBase64(record.salt));
  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: fromBase64(record.iv) }, key, fromBase64(record.ciphertext)
  );
  return JSON.parse(decoder.decode(plain)) as T;
}
