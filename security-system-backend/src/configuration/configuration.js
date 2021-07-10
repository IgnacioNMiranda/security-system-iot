import { config } from 'dotenv';

config();

const configuration = {
  mongo: {
    connection_string: process.env.MONGO_CONNECTION_STRING
  },
  api: {
    port: process.env.PORT || 3000,
  },
  twilio: {
    account_sid: process.env.TWILIO_ACCOUNT_SID,
    auth_token: process.env.TWILIO_AUTH_TOKEN
  }
};

export { configuration };
