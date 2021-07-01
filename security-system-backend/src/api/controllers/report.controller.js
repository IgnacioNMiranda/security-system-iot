import { ReportService } from '../services/report.service.js';

class ReportController {
  async getAllReports(req, res) {
    const reports = await ReportService.getReports();
    res.send(reports);
  }

  async getReportByType(req, res) {
    const { type } = req.params;
    const reports = await ReportService.getReportsByType(type);
    res.send(reports);
  }
}

export { ReportController };
