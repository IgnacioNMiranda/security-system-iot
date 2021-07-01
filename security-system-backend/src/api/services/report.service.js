import { Report } from '../../database/models/report.model.js';

class ReportService {
  static async getReports() {
    const reports = await Report.find({});
    return reports;
  }

  static async getReportsByType(type) {
    const reports = await Report.find({ type });
    return reports;
  }
}

export { ReportService };
