import { Report } from '../../database/models/report.model.js';

class ReportService {
  static async createReport(type) {
    const date = new Date();

    const report = new Report({
      date,
      type
    });
    await report.save();
    console.log(`Reporte '${type}' creado.`);
    return report;
  }

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
