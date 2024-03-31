import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';
import ejs from 'ejs';
import path from 'path';

interface EmailOptions{
    to: string,
    subject: string,
    template: string,
    data: {[key: string]: any}
}

const sendMail = async (options: EmailOptions): Promise<void> => {
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    const {to, subject, template, data} = options;

    const templatePath = path.join(__dirname,"../mails/",template);

    const html: string = await ejs.renderFile(templatePath, data);

    const mailOptions: SendMailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject,
        html
    };

    await transporter.sendMail(mailOptions);
}

export default sendMail;