import { config } from 'dotenv';

config();

const configuration = {
  serial: {
    baudRate: process.env.BAUD_RATE || 9600,
    port: process.env.SERIAL_PORT || 'COM2',
  },
  twilio: {
    account_sid: process.env.TWILIO_ACCOUNT_SID,
    auth_token: process.env.TWILIO_AUTH_TOKEN
  },
  mongo: {
    connection_string: process.env.MONGO_CONNECTION_STRING
  },
  api: {
    port: process.env.PORT || 3000,
  }
};

export { configuration };
