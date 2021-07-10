import twilio from 'twilio';

class TwilioReportUtil {
  constructor() {
    this.twilioClient = new twilio.Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  async sendTwilioReportMessages(type) {
    if (type === 'alertaIngresoFallido') {
      const numbers = ['+56962038649', '+56963712420'];
      numbers.forEach(async (number) => {
        try {
          const message = await this.twilioClient.messages
          .create({
              body: `Your security code is ${type}`,
              from: 'whatsapp:+14155238886',
              to: `whatsapp:${number}`
            });
          console.log(`Mensaje enviado a ${message.to}.`);
        } catch (error) {
          console.log(`Error enviando mensaje a ${number}`);
        }
      });
    }
  }
}

export { TwilioReportUtil };
