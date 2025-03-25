const { handleHttpError } = require("../utils/errorHandler");
const { sendEmail } = require("../config/nodemailerConfig");
const contactMeTemplate = require("../templates/emails/contactMeTemplate");

const contactMe = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const subject = "Nuevo mensaje de contacto";

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      //replyTo: email,
      ...contactMeTemplate({ name, email, subject, message })
    };
    const result = await sendEmail(mailOptions);
    console.log("Email sent:", result, { name, email, message });

    res.send({ data: result });
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = { contactMe };
