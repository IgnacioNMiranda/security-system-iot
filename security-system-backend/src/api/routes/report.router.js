import express from 'express';
import { ReportController } from '../controllers/report.controller.js';

class ReportRouter {
  static path = '/reports';

  constructor() {
    this.router = express.Router();
    this.controller = new ReportController();

    this.router.get('/', this.controller.getAllReports);

    this.router.get('/:type', this.controller.getReportByType);
  }
}

export { ReportRouter };
