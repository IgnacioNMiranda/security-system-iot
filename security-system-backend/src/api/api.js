import express from 'express';
import { ReportRouter } from './routes/report.router.js';
import { configuration } from '../configuration/configuration.js';

class Api {
  constructor () {
    this.api = express();
    this.api.use(express.json());
    this.api.listen(configuration.api.port, () => {
        console.log('server on port', configuration.api.port);
    });

    this.api.use(ReportRouter.path, new ReportRouter().router);
  }
}

export { Api };
