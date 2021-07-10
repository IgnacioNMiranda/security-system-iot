import express from 'express';
import { ReportRouter } from './routes/report.router.js';
import { configuration } from '../configuration/configuration.js';
import cors from 'cors';

class Api {
  constructor () {
    this.api = express();
    this.api.use(express.json());
    this.api.use(
      cors({
          origin: true,
          methods: 'GET,PATCH,POST,DELETE',
          preflightContinue: false,
          exposedHeaders: ['x-csrf-jwt', 'x-csrf-jwt-hash'],
          credentials: true,
      })
    );
    this.api.listen(configuration.api.port, () => {
        console.log('Server on port', configuration.api.port);
    });

    this.api.use(ReportRouter.path, new ReportRouter().router);
    this.api.get('/', (req, res) => {
      res.send('OK status - Security System');
    })
  }
}

export { Api };
