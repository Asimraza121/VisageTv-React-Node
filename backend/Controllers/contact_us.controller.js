const nodeMailer = require("nodemailer");
const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AXDJyPAh2CDTtAH-9ypjNEYDeU71YOErh7jt7IqhjGWc8qWmm8UyTxKmR6E10OZ7-olzqwkXcFz98AJf",
  client_secret:
    "EFJWnT6-ZYJ58zCkrr7CUWGl0H32Puon1ftkmo-0BQIL1DiGfvmoMpdNNvemTjU1UmQf-4v-OAzUHAa7",
});

exports.contactController = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;
    console.log("body", req.body);
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL, // generated ethereal user
        pass: process.env.SMTP_PASS, // generated ethereal password
      },
      // tls: {
      //   rejectUnauthorized: false,
      // },
      // auth: {
      //   user: "iamreactexpertdeveloper@gmail.com", // generated ethereal user
      //   pass: "reactdev00786#", // generated ethereal password
      // },
    });

    let info = await transporter.sendMail({
      from: process.env.SMTP_EMAIL, // sender address
      to: `${email}`, // list of receivers
      subject: "Thanks For you suggestion", // Subject line
      text: "", // plain text body
      html: "<b><h1>Your Query has been sent successfully!</h1> <p> We will try my best to resolve your problem and contact as soon as possible.</p></b>", // html body
    });
    res.status(200).json({
      status: true,
      message: "Email send successfully.",
      data: info.messageId,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error found",
      error: error,
    });
  }
};

exports.paymentPaypalController = async (req, res) => {
  try {
    let create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://return.url",
        cancel_url: "http://cancel.url",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "item",
                sku: "item",
                price: 1.0,
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: 1.0,
          },
          description: "This is the payment description.",
        },
      ],
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        console.log("Create Payment Response");
        console.log(payment);
        res.send("test");
      }
    });
  } catch (error) {}
};
