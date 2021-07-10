import { Mongo } from './database/mongo.js';
import { Api } from './api/api.js';

class App {
    constructor() {
        this.api = new Api();
        this.initMongoConnection();
    }

    async initMongoConnection() {
        await Mongo.connection();
    }
}

export default new App();
