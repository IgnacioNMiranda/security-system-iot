import { Report } from '../../database/models/report.model.js';
import { TwilioReportUtil } from '../../utils/twilioReport.util.js';

class ReportService {
  constructor() {
    this.twilioUtil = new TwilioReportUtil();
  }

  async createReport(type) {
    try {
      const date = new Date();

      const report = new Report({
        date,
        type
      });
      await report.save();

      await this.twilioUtil.sendTwilioReportMessages(type);

      console.log(`Reporte '${type}' creado.`);
      return report;
    } catch (error) {
      console.log(error);
    }
  }

  async getReports() {
    try {
      const reports = await Report.find({});
      return reports;
    } catch (error) {
      console.log(error);
    }
  }

  async getReportsByType(type) {
    try {
      const reports = await Report.find({ type });
      return reports;
    } catch (error) {
      console.log(error);
    }
  }
}

export { ReportService };
