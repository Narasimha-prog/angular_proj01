import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import session from 'express-session';
import { serverEnvironment } from './environments/server_oauth';
const browserDistFolder = join(import.meta.dirname, '../browser');
import { Issuer, generators } from 'openid-client';
import { InjectionToken, Provider } from '@angular/core';
import { USER_TOKEN } from './app/model/user_model';

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/* --------------------------------------------------
   SESSION TYPE AUGMENTATION (TS-safe)
-------------------------------------------------- */
declare module 'express-session' {
  interface SessionData {
    user?: Record<string, any> | null;
    oauth?: {
      state: string;
      nonce: string;
      code_verifier: string;
    };
  }
}
/* --------------------------------------------------
   SESSION MIDDLEWARE
-------------------------------------------------- */

app.use(

  session({
    name: 'ssid',
    secret: 'super-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // set true in prod (HTTPS)
      sameSite: 'lax',
    },
  }),
);

/* --------------------------------------------------
   OIDC DISCOVERY
-------------------------------------------------- */

let client: any;

(async () => {
  const issuer = await Issuer.discover(
    `${serverEnvironment.oauth.issuer}/.well-known/openid-configuration`,
  );

  client = new issuer.Client({
    client_id: serverEnvironment.oauth.client_id,
    client_secret: serverEnvironment.oauth.client_secret,
    redirect_uris: [serverEnvironment.oauth.redirect_uri],
    response_types: ['code'],
  });
})();

app.use((_req, res, next) => {
  if (!client) {
    console.log('⏳ OIDC client not ready');
    return res.status(503).send('Auth initializing, retry');
  } else {
    console.log('✅ OIDC client ready');
    return next();
  }
});

/* --------------------------------------------------
   LOGIN
-------------------------------------------------- */

app.get('/login', (req, res) => {
  console.log('Initiating OAuth login');
  
  const code_verifier = generators.codeVerifier();
  const code_challenge = generators.codeChallenge(code_verifier);
  const state = generators.state();
  const nonce = generators.nonce();

  // 🔐 Store securely on SERVER
  req.session.oauth = {
    code_verifier,
    state,
    nonce,
  };

  const authorizationUrl = client.authorizationUrl({
    scope: serverEnvironment.oauth.scopes,
    redirect_uri: serverEnvironment.oauth.redirect_uri,
    response_type: 'code',
    code_challenge,
    code_challenge_method: 'S256',
    state,
    nonce,
  });

  res.redirect(authorizationUrl);
});

/* --------------------------------------------------
   CALLBACK
-------------------------------------------------- */

app.get('/auth/callback', async (req, res) => {
  try {
    console.log('Handling OAuth callback');

    const code = req.query['code'] as string | undefined;

    const state = req.query['state'] as string | undefined;

    console.log('OAuth callback received:', { code, state });

    if (!code || typeof code !== 'string')
      return res.status(400).send('Missing code');

    if (!req.session.oauth) return res.status(400).send('Missing session');

    if (state !== req.session.oauth.state)
      return res.status(400).send('Invalid state');

    const tokenSet = await client.callback(
      serverEnvironment.oauth.redirect_uri,
      { code, state },
      {
        code_verifier: req.session.oauth.code_verifier,
        state: req.session.oauth.state,
        nonce: req.session.oauth.nonce,
      },
    );

    // 🧹 Cleanup (important!)
    delete req.session.oauth;

    // Store user in session
    req.session.user = parseIdToken(tokenSet.id_token || '');

    return res.redirect('/');
  } catch (err) {
    console.error('OAuth callback error:', err);
    return res.status(500).send('Authentication failed');
  }
});

/* --------------------------------------------------
   LOGOUT
-------------------------------------------------- */
app.get('/logout', (req, res) => {
  console.log('Logging out user');
  req.session.destroy(() => res.redirect('/'));
});

/* --------------------------------------------------
   API
-------------------------------------------------- */
app.get('/api/me', (req, res) => {
  console.log('Fetching user info');
  if (!req.session.user)
    return res.status(401).json({ error: 'Not authenticated' });
  return res.json(req.session.user);
});

/* --------------------------------------------------
   ID TOKEN PARSER
-------------------------------------------------- */

function parseIdToken(idToken: string) {
  if (!idToken) return null;

  const payload = idToken.split('.')[1];

  return JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
}


/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
// 1️⃣ Log every incoming request


  console.log('➡️ Incoming request:', req.url);
  if (
    req.url.startsWith('/api') ||
    req.url.startsWith('/login') ||
    req.url.startsWith('/logout') ||
    req.url.startsWith('/auth')
  ) {
    return next(); // 🔥 do not send to Angular SSR
  }


  // 2️⃣ Prepare SSR provider for user from session
const ssrProviders: Provider[] = [
  { provide: USER_TOKEN, useValue: req.session?.user || null },
];

  angularApp
    .handle(req,{ extraProviders: ssrProviders })
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
