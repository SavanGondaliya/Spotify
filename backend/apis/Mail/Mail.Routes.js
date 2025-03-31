import express from  "express";
import { RegistrationMail,verifyEmail,optEmail } from "./Mail.controller.js";

export const MailRouter = express.Router();

MailRouter.get('/mail/register/',RegistrationMail);
MailRouter.get('/mail/verify',verifyEmail);
MailRouter.get('/otp/send',optEmail);

export default MailRouter;
