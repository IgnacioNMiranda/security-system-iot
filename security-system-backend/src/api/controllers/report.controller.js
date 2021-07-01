import { ReportService } from '../services/report.service.js';

class ReportController {
  async getAllReports(req, res) {
    console.log("Getting all reports...");
    const reports = await ReportService.getReports();
    res.send(reports);
  }

  async getReportByType(req, res) {
    const { type } = req.params;
    console.log(`Getting '${type}' reports...`);
    const reports = await ReportService.getReportsByType(type);
    res.send(reports);
  }
}

export { ReportController };
