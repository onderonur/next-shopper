export function getSessionCookieName() {
  const cookieName = 'authjs.session-token';
  return process.env.NODE_ENV === 'production'
    ? `__Secure-${cookieName}`
    : cookieName;
}
