const nodemailer = require('nodemailer');



  export const sendVerifyMail = async (email: string, otp: string) => {
    try {
      const https = require('https');

      const agent = new https.Agent({
        rejectUnauthorized: false, // Set this to true in production
      });

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'arjun.tech177@gmail.com',
          pass: 'nctv beiz wucl vlnh',
        },
        tls: {
          rejectUnauthorized: false, // Set this to true in production
        },
        agent, // Pass the agent to nodemailer
      });

      const mailOptions = {
        from: 'arjun.tech177@gmail.com',
        to: email,
        subject: 'Verification Mail',
        html: `<p>Hi, your OTP for signing up is: ${otp}</p>`,
      };

      // Promisify sendMail
      const sendMailPromise = new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            console.log('Email has been sent', info.response);
            resolve(info);
          }
        });
      });

      // Wait for the email to be sent
      await sendMailPromise;

      return true; // Indicate success
    } catch (error) {
      console.error(error.message);
      return false; // Indicate failure
    }
  };

