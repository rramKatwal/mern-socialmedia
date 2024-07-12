import nodemailer from "nodemailer";

export const mailer = (email, optCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.GMAIL}`,
      pass: `${process.env.PASSKEY}`,
    },
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: `"Testing" ${process.env.GMAIL}`,
    to: email,
    subject: "Your OTP code",
    text: `Your 6 digit OTP code is: ${optCode}. `,
    html: `Your 6 digit OTP code is: ${optCode}. It expires after 3 minutes.`,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw error;
    }
  });
};
