import nodeMailer from 'nodemailer';
import * as Twig from 'twig';
import Mail = require('nodemailer/lib/mailer');

import { IOptionSendEmail } from './email.interface';
import { BadRequestException } from '@nestjs/common';

import { APP_CONFIG } from '../../configs/app.config';

export async function sendMailSMTP(params: IOptionSendEmail) {
  try {
    const configEmail = APP_CONFIG.ENV.MAIL_CONFIG.SMTP_CONFIG;
    const transporter = nodeMailer.createTransport(configEmail);
    /*     const transporter = nodeMailer.createTransport({
      //service: 'Gmail',
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 587, false for other ports
      requireTLS: true,
      auth: {
        user: 'bots0000002@gmail.com',
        pass: 'hunfmguzgfkniwhe', // hunfmguzgfkniwhe gch18524
      },
    }); */
    const pathToFile = `${__dirname}/public/templates/${params?.language || 'vi'}/${params?.templateKey}.html.twig`;

    const htmlContent = await renderHtmlByTwig(pathToFile, params?.contentMail);
    const mailOptions: Mail.Options = {
      from: APP_CONFIG.ENV.MAIL_CONFIG.FROM,
      subject: params?.subject,
      html: htmlContent,
    };
    if (params?.mailTo) mailOptions.to = params?.mailTo;
    if (params?.bcc) mailOptions.bcc = params?.bcc;
    if (params?.cc) mailOptions.cc = params?.cc;

    if (mailOptions.to.length === 0 && mailOptions.bcc.length === 0 && mailOptions.cc.length === 0) {
      throw new BadRequestException({ message: 'Không có người nhận' });
    }

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(error);
    throw new BadRequestException(error.message);
  }
}

export async function renderHtmlByTwig(path: string, contentMail: any) {
  return new Promise(async function (resolve, reject) {
    try {
      Twig.renderFile(path, contentMail, async (err, htmlContent) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(htmlContent);
      });
    } catch (error) {
      reject(error);
    }
  });
}
