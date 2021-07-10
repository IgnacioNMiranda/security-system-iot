import { config } from 'dotenv';

config();

const configuration = {
  serial: {
    baudRate: Number(process.env.BAUD_RATE) || 9600,
    port: process.env.SERIAL_PORT || 'COM2',
  },
  api: {
    url: process.env.API_URL
  }
};

export { configuration };
