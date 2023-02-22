const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { user } = require("./env.js");

dotenv.config({ path: "../../config/config.env" });
// const EMAIL = process.env.EMAIL;
// const PASSWORD = process.env.PASSWORD;

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.main = async (DATA, name, link) => {
  let info = await mailTransport
    .sendMail({
      from: process.env.EMAIL, // sender address
      to: DATA, // list of receivers
      subject: "Hello ✔", // Subject line
      text: `Hello , ${name}`, // plain text body
      html: `
      <div style="background-color: #bbf;">
      <h1><a class="btn btn-danger " href="${link}">Confirmed</a></h1>
      </div>
      `, // html body
    })
    .then((done) => console.log(`send email success ${done}`))
    .catch((err) => console.log(`send email not success ${err}`));
};
