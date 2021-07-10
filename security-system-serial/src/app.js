import { SerialConnectorUtil } from './utils/serialConnector.util.js';

class App {
    constructor() {
        this.serial = new SerialConnectorUtil();
    }
}

export default new App();
