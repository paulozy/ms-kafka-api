import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

interface IMailer {
  recipient: string;
  data: {
    title: string;
    content: string;
    author: string;
  };
}

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "199f7a9dc536d5",
    pass: "26a966677505f5",
  },
});

export async function sendEmail({ recipient, data }: IMailer): Promise<void> {
  const message = {
    from: "ms_kafka@email.com",
    to: recipient,
    subject: `${data.author} - ${data.title}`,
    text: data.content,
  };

  await transport.sendMail(message);
}
