import express from "express";
import {
  Register,
  ResetPassword,
  login,
} from "../controllers/authController.js";
import { sendMail } from "../controllers/mailController.js";

//router decleration
const router = express.Router();

//registration route
router.post("/register", Register);
//login route
router.post("/login", login);
//send email
router.post("/email", sendMail);
// reset password
router.put("/reset-password", ResetPassword);

export default router;
