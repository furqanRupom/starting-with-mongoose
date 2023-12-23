import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to:string,html:string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'furqanrupom978@gmail.com',
      pass: 'ctpj ixao munw bjub',
    },
  });

  await transporter.sendMail({
    from: 'nzisbdnddddcj@gmail.com', // sender address
    to: to, // list of receivers
    subject: 'Please Reset your password within 10 minutes.', // Subject line
    text: '', // plain text body
    html, // html body
  });
};


export default sendEmail;