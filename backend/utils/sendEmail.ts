import nodemailer from 'nodemailer';

import ErrorHandler from './errorHandler';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { env } from '@/app/env-var';

interface EmailProps {
  email?: string;
  subject: string;
  template: string;
}

export async function sendEmail({ email, subject, template }: EmailProps) {
  try {
    const options: SMTPTransport.Options = {
      host: env.EMAIL_SERVER_HOST,
      port: Number(env.EMAIL_SERVER_PORT),
      auth: {
        user: env.EMAIL_SERVER_USER,
        pass: env.EMAIL_SERVER_PASSWORD,
      },
      secure: true,
    };
    const transporter = nodemailer.createTransport(options);
    await transporter.sendMail({
      from: env.EMAIL_FROM,
      to: email || 'delivered@resend.dev',
      subject: subject,
      html: template,
    });
  } catch (error: any) {
    if ('message' in error) throw new ErrorHandler(error?.message, 500);
  }
}
