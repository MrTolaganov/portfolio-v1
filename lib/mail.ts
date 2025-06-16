import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  port: +process.env.SMTP_PORT!,
  host: process.env.SMTP_HOST,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
})
