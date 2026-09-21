export function randomString(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const bytes = crypto.getRandomValues(new Uint8Array(length));

  return Array.from(bytes, byte => chars[byte % chars.length]).join("");
}
