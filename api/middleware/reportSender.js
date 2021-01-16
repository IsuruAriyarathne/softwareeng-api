const nodemailer = require('nodemailer');
// const defaultMailingList = "gkkpathirana@gmail.com,isuru.18@cse.mrt.ac.lk,poorna2152@gmail.com"; 
const defaultMailingList = "gkkpathirana@gmail.com,kavindag.18@cse.mrt.ac.lk";  
const senderEmail = "malnimkam@gmail.com";
const senderPassword = "nimkam@2020"; 
module.exports = {
    sendMail: async (subject, text, to = defaultMailingList) => {
        try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
            user: senderEmail,
            pass: senderPassword,
            },
        });

        const message = {
            from: `report sender <${senderEmail}>`,
            to,
            subject,
            text: subject,
            html: text,
        };

        transporter.sendMail(message, () => {});
        } catch (e) {
        // handle errors here
        }
    },
};