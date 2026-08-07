import { createCipheriv, createHmac, pbkdf2Sync } from "node:crypto";

const PBKDF2_ITERATIONS = 100000;
const SALT_LENGTH = 16;
const IV_LENGTH = 12;
const KEY_LENGTH = 32;

/**
 * Derive deterministic bytes from a key and context string using HMAC-SHA256.
 *
 * 注意：返回值统一为 TS lib 的原生 Uint8Array。项目同时存在
 * @types/node@17（sitemap 依赖）与 @types/node@24（vite/astro peer），
 * 两个版本的 Buffer/Uint8Array 泛型签名不兼容，直接传递 node 类型的
 * Buffer 会触发 tsc 报错；Uint8Array.from 走 ArrayLike 检查可安全跨版本。
 */
function deriveBytes(key: string, context: string, length: number): Uint8Array {
	return Uint8Array.from(
		createHmac("sha256", key).update(context).digest().subarray(0, length),
	);
}

function concatBytes(...parts: Uint8Array[]): Uint8Array {
	const out = new Uint8Array(parts.reduce((n, part) => n + part.length, 0));
	let offset = 0;
	for (const part of parts) {
		out.set(part, offset);
		offset += part.length;
	}
	return out;
}

/**
 * Encrypt HTML content with AES-256-GCM using PBKDF2-derived key.
 * Salt and IV are deterministic (derived from password + slug) so the same
 * inputs always produce the same ciphertext — this makes sessionStorage
 * password caching work reliably across page reloads.
 *
 * Output format: base64(salt[16] + iv[12] + authTag[16] + ciphertext)
 */
export function encryptContent(
	html: string,
	password: string,
	slug: string,
): string {
	const salt = deriveBytes(password, `salt:${slug}`, SALT_LENGTH);
	const iv = deriveBytes(password, `iv:${slug}`, IV_LENGTH);
	const key = Uint8Array.from(
		pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, KEY_LENGTH, "sha256"),
	);

	const cipher = createCipheriv("aes-256-gcm", key, iv);
	const encrypted = concatBytes(
		Uint8Array.from(cipher.update(html, "utf8")),
		Uint8Array.from(cipher.final()),
	);
	const authTag = Uint8Array.from(cipher.getAuthTag());

	const result = concatBytes(salt, iv, authTag, encrypted);
	return Buffer.from(result).toString("base64");
}
