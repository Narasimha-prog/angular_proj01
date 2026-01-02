export interface AuthTokenPayload {
  sub: string;          // user identifier (email)
  aud: string;          // audience
  azp: string;          // authorized party (client id)
  auth_time: number;    // authentication time (epoch seconds)
  iss: string;          // issuer
  exp: number;          // expiration time (epoch seconds)
  iat: number;          // issued at (epoch seconds)
  nonce: string;        // nonce used during auth
  jti: string;          // JWT ID
  sid: string;          // session ID
}

export interface AuthState {
  tokenPayload: AuthTokenPayload | null;
  status: 'idle' | 'loading' | 'authenticated' | 'error';
  error: string | null;
}

