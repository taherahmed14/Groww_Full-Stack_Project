const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connect = require('./configis/db');

const homeController = require('./controller/home.controller');
const productController = require('./controller/product.controller');
const cartController = require('./controller/cart.controller');
const paymentController = require('./controller/payment.controller');

app.use(express.json());
app.use(express.static('public'));
app.set('view engine','ejs');

app.use('/home',homeController);
app.use('/products', productController);
app.use("/cart", cartController);
app.use("/payment", paymentController);


/*  OTP Section */

const bodyparser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const exphbs = require("express-handlebars");

// view engine setup
app.engine(
  "handlebars",
  exphbs({ extname: "hbs", defaultLayout: false, layoutsDir: "views/ " })
);
app.set("view engine", "handlebars");

// body parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//static folder
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/netbanking", function (req, res) {
  res.render("OTP/netbanking");
});

// const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID =
  "388158439783-5jgictu6ekt7iotstsp68cartt0mjuf8.apps.googleusercontent.com";
const CLEINT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//045tjWzHXVTduCgYIARAAGAQSNwF-L9IrSrIGfJSN88Ngz3JxblIfR4C_oYli6uMG12ZoqEKPJ5dZchCJROMbgXoSrG70spS5xrs";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

var email;

var otp = Math.floor(1000 + Math.random() * 9000);
console.log(otp);

var otp2 = Math.floor(1000 + Math.random() * 9000);
console.log(otp2);

app.post("/send", function (req, res) {

  // console.log("body", req.body)
  email = "ipankaj7488@gmail.com";
  // email = req.body.email;
  console.log("input Email: ", email);

  async function sendMail() {
    try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "praj4936@gmail.com",
          clientId: CLIENT_ID,
          clientSecret: CLEINT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      // send mail with defined transport object
      var mailOptions = {
        from: "Groww-Team <praj4936@gmail.com>",
        to: `${email}`,
        subject: "Groww Payment: ",
        html:`<img src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/logo-light-groww.1815ad63.svg"
                            width="150" height="50" alt="Groww Logo" >
                ` +
          "<h3>OTP for Payment Confirmation is </h3>" +
          "<h1 style='font-weight:bold;'>" +
          otp +
          "</h1>", // html body
      };

      const result = await transport.sendMail(mailOptions);

      res.render("OTP/otp");

      return result;
    } catch (error) {
      return error;
    }
  }

  sendMail()
    .then((result) => console.log("Email sent...", result))
    .catch((error) => console.log(error.message));
});

app.post("/verify", function (req, res) {
  console.log("otp - ", req.body.otp)
  if (req.body.otp == otp || req.body.otp == otp2 ) {
    // res.send("Yay! Order Successfully Placed");
    res.render("OTP/confirmation", { msg: "Yay! Order Successfully Placed" });
  } else {
    res.render("OTP/otp", { msg: "OTP is incorrect" });
  }
});

app.post("/resend", function (req, res) {
  // email = req.body.email;
  email = "ipankaj7488@gmail.com";
  // console.log(email);

  async function sendMail1() {
    try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "praj4936@gmail.com",
          clientId: CLIENT_ID,
          clientSecret: CLEINT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });

      var mailOptions = {
        from: "Groww-Team <praj4936@gmail.com>",
        to: `${email}`,
        subject: "Groww Payment: ",
        html:
          "<h3>OTP for Payment Confirmation is </h3>" +
          "<h1 style='font-weight:bold;'>" +
          otp2 +
          "</h1>", // html body
      };

      const result = await transport.sendMail(mailOptions);
      res.render("OTP/otp", { msg: "OTP has been sent" });
      return result;
    } catch (error) {
      return error;
    }
  }

  sendMail1()
    .then((result) => console.log("Email sent...", result))
    .catch((error) => console.log(error.message));
});

app.listen('2500' , async () => {
    await connect();
  console.log("We are listening 2500");
})
