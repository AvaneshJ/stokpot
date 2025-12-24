import { email } from "better-auth";
import nodemailer from "nodemailer";
import { WELCOME_EMAIL_TEMPLATE } from "./templates";
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const sendWelcomeEmail = async ({
  email,
  name,
  intro,
}: WelcomeEmailData) => {
  console.log("Sending welcome email to:", email);
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace("{{name}}", name).replace(
    "{{intro}}",
    intro
  );
  const mailOptions = {
    from: `"Stokpot" <${process.env.NODEMAILER_EMAIL}>`,
    to: email,
    subject: "Welcome to Stokpot- Your stock market toolkit is ready!",
    text: "Thanks for joining Stokpot",
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};
