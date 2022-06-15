import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import router from './routes';
import colors from 'colors';
import errorHandler from './middleware/error';
import cors from 'cors';

dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT;
const app = express();

// order is important
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
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