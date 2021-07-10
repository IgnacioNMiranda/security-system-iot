import { ReportService } from '../services/report.service.js';

class ReportController {
  constructor() {
    this.service = new ReportService();
  }

  async createReport(req, res) {
    const { type } = req.body.data;
    console.log(`Creating '${type}' report...`);
    const report = await this.service.createReport(type);
    res.send(report);
  }

  async getAllReports(req, res) {
    console.log("Getting all reports...");
    const reports = await this.service.getReports();
    res.send(reports);
  }

  async getReportByType(req, res) {
    const { type } = req.params;
    console.log(`Getting '${type}' reports...`);
    const reports = await this.service.getReportsByType(type);
    res.send(reports);
  }

}

export { ReportController };
