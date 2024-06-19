import nodemailer from 'nodemailer';

import ErrorHandler from './errorHandler';

interface EmailProps {
  email?: string;
  subject: string;
  template: string;
}

export async function sendEmail({ email, subject, template }: EmailProps) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      secure: true,
    });
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email || 'delivered@resend.dev',
      subject: subject,
      html: template,
    });
  } catch (error: Error) {
    if ('message' in error) throw new ErrorHandler(error?.message, 500);
  }
}
