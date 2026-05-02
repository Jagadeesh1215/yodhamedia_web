import "server-only";
import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

function hasSmtpConfig() {
  return Boolean(smtpHost && smtpUser && smtpPass);
}

export async function sendMail({
  subject,
  text,
  html,
  replyTo,
}: {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}) {
  if (!hasSmtpConfig()) {
    return { skipped: true };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || smtpUser,
    to: process.env.CONTACT_TO || smtpUser,
    subject,
    text,
    html,
    replyTo,
  });

  return { skipped: false };
}
