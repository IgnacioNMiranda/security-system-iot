import serialPort from 'serialport';
import { configuration } from '../configuration/configuration.js';
import { ReportService } from '../api/services/report.service.js';
import { ReportUtil } from '../utils/report.util.js';

class SerialConnectorUtil {
  constructor() {
    this.reportUtil = new ReportUtil();

    this.parser = new serialPort.parsers.Readline();
    this.serial = new serialPort(configuration.serial.port, {
        baudRate: configuration.serial.baudRate,
        autoOpen: false,
    });

    this.serial.pipe(this.parser);

    this.initParserEvents();

    this.serial.open(function (err) {
      if (err) {
        console.log(`Ocurrió un error inesperado. Revise si el puerto ${configuration.serial.port} se encuentra activo.`);
      }
    });
  }

  initParserEvents() {
    this.parser.on('open', () => {
        console.log('Opened Serial Port');
    });

    this.parser.on('data', async (data) => {
        const type = data.toString().replace(/\s+/g, '');

        await ReportService.createReport(type);
        await this.reportUtil.sendTwilioReportMessages(type);
    });

    this.parser.on('error', (err) => {
        console.log(err);
    });
  }
}

export { SerialConnectorUtil };
