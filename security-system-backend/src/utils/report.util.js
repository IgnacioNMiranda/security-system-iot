import { Report } from '../database/models/report.model.js';
import twilio from 'twilio';

class ReportUtil {
  constructor() {
    this.twilioClient = new twilio.Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  async createReport(type) {
    const date = new Date();

    const report = new Report({
      date,
      type
    });
    await report.save();

    if (type === 'alertaIngresoFallido') {
      const numbers = ['+56962038649', '+56963712420'];
      numbers.forEach(async (number) => {
        const message = await this.twilioClient.messages
        .create({
            body: '¡ALERTA! Han ocurrido numerosos intentos de acceso a la puerta 02. Se recomienda precaución.',
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${number}`
          });
        console.log(`Mensaje enviado a ${message.to}.`);
      });
    }

    console.log(`Reporte '${type}' creado.`);
    return report;
  }
}

export { ReportUtil };
