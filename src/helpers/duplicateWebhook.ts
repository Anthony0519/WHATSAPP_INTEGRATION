const dedupeMap = new Map<string, number>();
const DEFAULT_TTL_SECONDS = 60;

function markKeyWithTTL(key: string, ttlSeconds = DEFAULT_TTL_SECONDS) {
  const expiresAt = Date.now() + ttlSeconds * 1000;
  dedupeMap.set(key, expiresAt);
  // schedule cleanup (unref not necessary in Node but helps with background timers)
  const timeout = setTimeout(() => {
    dedupeMap.delete(key);
  }, ttlSeconds * 1000 + 1000);
  // @ts-ignore - unref may not exist in some runtimes; guard it
  if (typeof timeout.unref === 'function') timeout.unref();
}

function isDuplicateKey(key: string): boolean {
  const now = Date.now();
  const exp = dedupeMap.get(key) ?? 0;
  if (exp > now) return true;
  return false;
}

export const tryReserveKey = (key: string, ttlSeconds = DEFAULT_TTL_SECONDS): boolean => {
  if (isDuplicateKey(key)) return false;
  markKeyWithTTL(key, ttlSeconds);
  return true;
}