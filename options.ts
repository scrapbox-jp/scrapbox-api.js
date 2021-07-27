export type Options = {
  sid?: string;
  fetch?: (
    ...args: Parameters<typeof globalThis.fetch>
  ) => ReturnType<typeof globalThis.fetch>;
};

export function createCookieHeaders(sid: string) {
  return {
    headers: { Cookie: `connect.sid=${sid}` },
  };
}
