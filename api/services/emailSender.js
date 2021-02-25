const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const defaultMailingList = "gkkpathirana@gmail.com,kavindag.18@cse.mrt.ac.lk";
const config = require('../config/config')

// These id's and secrets should come from .env file.
const CLIENT_ID = config.mail.clinetID
const CLEINT_SECRET = config.mail.clientSecret
const REDIRECT_URI = config.mail.redirectUri
const REFRESH_TOKEN = config.refreshToken
const mail = config.mail.mail

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  module.exports = { 
    sendMail: async  (subject, text, to = defaultMailingList)  => {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: mail,
          clientId: CLIENT_ID,
          clientSecret: CLEINT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
  
      const mailOptions = {
        from: 'SLFire <malnimkam@gmail.com>',
        to,
        subject,
        text: subject,
        html: text,
      };
  
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  }
}
