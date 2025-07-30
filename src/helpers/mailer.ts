import nodemailer from 'nodemailer'


export const sendEmail=async({email,emailType,userId}:any)=> {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yourgmail@gmail.com',
        pass: 'your_app_password' // Use App Password, not your Gmail password
      }
    });

    // Email options
    const mailOptions = {
      from: 'yourgmail@gmail.com',
      to: email,
      subject: emailType==="VERIFY" ? "Verify your email" : "Reset your password",
     
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (err) {
    console.error('Error sending email:', err);
  }
}
