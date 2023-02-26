import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import router from './routes';
import colors from 'colors';
import errorHandler from './middleware/error';
import cors from 'cors';
import { expressjwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';

dotenv.config({ path: './config/config.env' });

const authConfig = {
  domain: 'dev-w-h3k6j0.us.auth0.com',
  audience: 'https://vue-express-api.com',
};

// Create middleware to validate the JWT using express-jwt
const checkJwt = expressjwt({
  // Provide a signing key based on the key identifier in the header and the signing keys provided by your Auth0 JWKS
  // endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  // Validate the audience (Identifier) and the issuer (Domain).
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ['RS256'],
});

const PORT = process.env.PORT;
const app = express();

// order is important
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
// app.use(checkJwt);
app.use('/api/words', router);
app.use(errorHandler);

const server = app.listen(PORT);

server.on('listening', () => {
  console.log(`Server is running at http://localhost:${PORT}`.yellow.bold);
});

process.on('exit', () => {
  server.close();
});
process.on('uncaughtException', (err) => {
  console.log(err.message.red);
  server.close();
});
process.on('SIGTERM', () => {
  server.close();
});
