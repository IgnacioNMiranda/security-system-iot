import express from 'express';
import { ReportController } from '../controllers/report.controller.js';

class ReportRouter {
  static path = '/reports';

  constructor() {
    this.router = express.Router();
    this.controller = new ReportController();

    this.router.post('/', this.controller.createReport.bind(this.controller));

    this.router.get('/', this.controller.getAllReports.bind(this.controller));

    this.router.get('/:type', this.controller.getReportByType.bind(this.controller));
  }
}

export { ReportRouter };
