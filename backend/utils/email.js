import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your@gmail.com",
      pass: "app-password"
    }
  });

  await transporter.sendMail({ from: "app@gmail.com", to, subject, text });
};