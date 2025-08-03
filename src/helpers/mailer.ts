import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer'


export const sendEmail=async({email,emailType,userId}:any)=> {
  try {

     const hashedToken=await bcryptjs.hash(userId.toString(),10);

     if(emailType==="VERIFY"){
       await User.findByIdAndUpdate(userId,
         {verifyToken:hashedToken , verifyTokenExpiry:Date.now()+3600000 }
       )
     }else if(emailType==="RESET"){
       await User.findByIdAndUpdate(userId,
         {forgotPasswordToken:hashedToken ,  forgotPasswordTokenExpiry:Date.now()+3600000 }
       )
     }


    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      }
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: email ,
      subject: emailType==="VERIFY" ? "Verify your email" : "Reset your password",
      html:`<p>Click <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>here</a> to ${ emailType==="VERIFY" ? "Verify your email" : "Reset your password"} or copy and paste the 
      the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (err) {
    console.error('Error sending email:', err);
  }
}
