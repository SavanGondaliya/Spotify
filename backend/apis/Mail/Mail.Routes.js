import express from  "express";
import { RegistrationMail,verifyEmail } from "./Mail.controller.js";

export const MailRouter = express.Router();

MailRouter.get('/mail/register/',RegistrationMail);
MailRouter.get('/mail/verify',verifyEmail);

export default MailRouter;
