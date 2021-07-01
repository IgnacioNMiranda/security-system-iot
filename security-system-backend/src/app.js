import serialPort from 'serialport';
import { ReportUtil } from './utils/report.util.js';
import { configuration } from './configuration/configuration.js';
import { Mongo } from './database/mongo.js';
import { Api } from './api/api.js';

class App {
    constructor() {
        this.parser = new serialPort.parsers.Readline();
        this.serial = new serialPort(configuration.serial.port, {
            baudRate: configuration.serial.baudRate
        });
        this.serial.pipe(this.parser);

        this.reportUtil = new ReportUtil();

        this.initParserEvents();

        this.api = new Api();
        this.initMongoConnection();
    }

    async initMongoConnection() {
        await Mongo.connection();
    }

    initParserEvents() {
        this.parser.on('open', () => {
            console.log('Opened Serial Port');
        });

        this.parser.on('data', async (data) => {
            const type = data.toString().replace(/\s+/g, '');
            await this.reportUtil.createReport(type);
        });

        this.parser.on('err', (err) => {
            console.log(err);
        });
    }
}

export default new App();
