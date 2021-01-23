const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const defaultMailingList = "gkkpathirana@gmail.com,kavindag.18@cse.mrt.ac.lk";

// These id's and secrets should come from .env file.
const CLIENT_ID = '917672764962-2knb352otj1m9el69c41pnhepq6d3ngl.apps.googleusercontent.com'
const CLEINT_SECRET = 'z_6g7GZkAv2DlU9tisZXmos2'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04QEHXQJIHN-FCgYIARAAGAQSNwF-L9IrTpoDNnuGCUY2GTrbpydC8V--FH0P_AbC8fkQANuyfyZU7JZGVj3OAKoomppgD1uIXwE'

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
          user: 'malnimkam@gmail.com',
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
        attachments: [{
                path: './SLFMonthlyReport.pdf'
            }]
      };
  
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  }
}