import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const hashed = await bcrypt.hash(userId, 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashed,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    }
    else if(emailType==='RESET'){
        await User.findByIdAndUpdate(userId,{
            forgotPasswordToken:hashed,
            forgotPasswordTokenExpiry:Date.now()+3600000
        })
    }

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_ID,
          pass: process.env.MAILTRAP_PASS
        }
      });
      const mailOptions={
        from:'mohitom2002@gmail.com',
        to:email,
        subject: emailType==='VERIFY'?'Verify your email':'Reset your password',
        html:`<p>Click<a href="${process.env.domain}/verifyemail?token=${hashed}">here</a> to ${emailType==='VERIFY' ? 'verify your email' : 'Reset your password'}</p>`
      }
      const mailResponse=await transport.sendMail(mailOptions)
      return mailResponse
  } catch (error) {
    throw new Error(error.message);
  }
};
