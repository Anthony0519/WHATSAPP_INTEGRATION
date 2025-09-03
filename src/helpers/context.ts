type ContextRecord = {
  expecting: 'quantity' | 'order_id' | 'address' | null;
  data?: any;
  expiresAt: number;
};

const contextMap = new Map<string, ContextRecord>();
const CONTEXT_DEFAULT_TTL_SECONDS = 120;

export const setContext = ( 
    waId: string, 
    expecting: ContextRecord['expecting'], 
    data: any = {}, 
    ttlSeconds = CONTEXT_DEFAULT_TTL_SECONDS
) => {
  const expiresAt = Date.now() + ttlSeconds * 1000;
  contextMap.set(waId, { expecting, data, expiresAt });
  // schedule cleanup
  const t = setTimeout(() => {
    const rec = contextMap.get(waId);
    if (rec && rec.expiresAt <= Date.now()) contextMap.delete(waId);
  }, ttlSeconds * 1000 + 1000);
  if (typeof (t as any).unref === 'function') (t as any).unref();
}

export const getContext = (waId: string): ContextRecord | null =>{
  const rec = contextMap.get(waId);
  if (!rec) return null;
  if (rec.expiresAt <= Date.now()) {
    contextMap.delete(waId);
    return null;
  }
  return rec;
}

export const clearContext = (waId: string) => {
  contextMap.delete(waId);
}
