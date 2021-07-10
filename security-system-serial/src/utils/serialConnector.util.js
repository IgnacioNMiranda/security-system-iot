import serialPort from 'serialport';
import { configuration } from '../configuration/configuration.js';
import { ReportService } from '../services/report.service.js';

class SerialConnectorUtil {
  constructor() {
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
      } else {
        console.log('Opened Serial Port');
      }
    });
  }

  initParserEvents() {
    this.parser.on('data', async (data) => {
        const type = data.toString().replace(/\s+/g, '');

        const report = await ReportService.createReport(type);
        console.log(report);
    });

    this.parser.on('error', (err) => {
        console.log(err);
    });
  }
}

export { SerialConnectorUtil };
