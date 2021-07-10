import axios from 'axios';
import { configuration } from '../configuration/configuration.js';

class ReportService {
  static url = configuration.api.url + '/reports';

  static async createReport(type) {
    try {
      const { data } = await axios.post(this.url, {
        method: 'post',
        data: { type }
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export { ReportService };
