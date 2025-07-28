import nodemailer from "nodemailer";

interface MailOptions {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
  [key: string]: any;
}

const transporter = nodemailer.createTransport({
//  service: process.env.EMAIL_SERVICE,
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendEmail = async (mailOptions: MailOptions): Promise<{ success: boolean; error?: any }> => {
  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};
