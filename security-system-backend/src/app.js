
import { Mongo } from './database/mongo.js';
import { Api } from './api/api.js';
import { SerialConnectorUtil } from './utils/serialConnector.util.js';

class App {
    constructor() {
        this.serialConnectorUtil = new SerialConnectorUtil();

        this.api = new Api();
        this.initMongoConnection();
    }

    async initMongoConnection() {
        await Mongo.connection();
    }
}

export default new App();
