const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const htmlToText = require('html-to-text');
const env = require('../config/environment');

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = 'e-commerce@gmail.com';
  }

  newTransport() {
    // if (env.name === 'production') {
    //   return 1;
    // }

    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '858458cad8c215',
        pass: '249b83567817c6'
      }
    });

    return transporter;
  }

  async send(template, subject) {
    const data = {
      firstName: this.firstName,
      url: this.url,
      subject: subject
    };

    const html = await ejs.renderFile(
      path.join(__dirname, '../views/emails', `${template}.ejs`),
      data
    );

    // 2) define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to E-commerce company');
  }
}

module.exports = Email;
