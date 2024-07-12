import { mailer } from "../functions/mail.js";
import OTP from "../model/otpModel.js";
import userModel from "../model/userModel.js";

export const sendMail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.send({
        success: false,
        message: "Please Enter your Valid Email",
      });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      const optCode = Math.floor(100000 + Math.random() * 900000);
      await new OTP({
        email,
        OTP: optCode,
        expiresIn: new Date().getTime() + 180 * 1000,
      }).save();

      mailer(email, optCode);

      return res.status(201).send({
        success: true,
        message: "OTP send Successfully. Please check your Email Id",
      });
    } else {
      return res.status(200).send({
        success: false,
        message: "Email not found. Please Register to continue.",
      });
    }
  } catch (error) {
    res.status(200).send({
      success: false,
      message: "Problem while sending Mail",
      error,
    });
  }
};
