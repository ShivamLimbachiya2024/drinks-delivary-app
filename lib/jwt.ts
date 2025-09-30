export interface TokenPayload {
  userId: string;
  role: 'admin' | 'vendor' | 'customer';
  exp: number;
}

export function generateToken(userId: string, role: 'admin' | 'vendor' | 'customer'): string {
  const expiresIn = 24 * 60 * 60 * 1000;
  const exp = Date.now() + expiresIn;

  const payload: TokenPayload = {
    userId,
    role,
    exp,
  };

  const token = btoa(JSON.stringify(payload));
  return token;
}

export function decodeToken(token: string): TokenPayload | null {
  try {
    const payload = JSON.parse(atob(token)) as TokenPayload;

    if (payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  const payload = decodeToken(token);
  return payload !== null;
}
