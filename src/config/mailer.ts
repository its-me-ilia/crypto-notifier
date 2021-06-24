  import {createTransport} from 'nodemailer';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';

export default createTransport({
    host: 'smtp.gmail.com',
    port: process.env.NODE_ENV === 'development' ? 587 : 465,
    secureConnection: process.env.NODE_ENV === 'production',
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_PASS
    }
} as SMTPTransport.Options);
