const nodemailer = require("nodemailer");
const ejs = require("ejs");
const sendingEmail = "abdullah.khan10032@gmail.com";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shopit290@gmail.com", // TODO: your gmail account
    pass: "shopit12345", // TODO: your gmail password
  },
});

const forgotPassword = async (options) => {
  const emailTemplate = await ejs.renderFile(
    __dirname + "/EmailTemplates/ForgotPassword.ejs",
    { resetUrl: options.resetUrl }
  );

  const message = {
    to: options.email,
    from: `Devlog ${sendingEmail}`,
    subject: options.subject,
    html: emailTemplate,
  };

  await transporter.sendMail(message);
};

const orderSuccess = async (options) => {
  const emailTemplate = await ejs.renderFile(
    __dirname + "/EmailTemplates/OrderSuccess.ejs",
    { orderId: options.orderId }
  );

  const message = {
    to: options.email,
    from: `Devlog ${sendingEmail}`,
    subject: options.subject,
    html: emailTemplate,
  };

  await transporter.sendMail(message);
};

const blogSuccess = async (options) => {
  const emailTemplate = await ejs.renderFile(
    __dirname + "/EmailTemplates/BlogSuccess.ejs",
    { blogId: options.blogId }
  );

  const message = {
    to: options.email,
    from: `Devlog ${sendingEmail}`,
    subject: options.subject,
    html: emailTemplate,
  };

  await transporter.sendMail(message);
};

const deleteBlog = async (options) => {
  const emailTemplate = await ejs.renderFile(
    __dirname + "/EmailTemplates/DeleteBlog.ejs",
    { blogId: options.blogId }
  );

  const message = {
    to: options.email,
    from: `Devlog ${sendingEmail}`,
    subject: options.subject,
    html: emailTemplate,
  };

  await transporter.sendMail(message);
};

const adminBlockUser = async (options) => {
  const emailTemplate = await ejs.renderFile(
    __dirname + "/EmailTemplates/AdminBlockUser.ejs",
    { email: options.email }
  );

  const message = {
    to: options.email,
    from: `Devlog ${sendingEmail}`,
    subject: options.subject,
    html: emailTemplate,
  };

  await transporter.sendMail(message);
};

const adminUnBlockUser = async (options) => {
  const emailTemplate = await ejs.renderFile(
    __dirname + "/EmailTemplates/AdminUnBlockUser.ejs",
    { email: options.email }
  );

  const message = {
    to: options.email,
    from: `Devlog ${sendingEmail}`,
    subject: options.subject,
    html: emailTemplate,
  };

  await transporter.sendMail(message);
};

const adminDeleteBlog = async (options) => {
  const emailTemplate = await ejs.renderFile(
    __dirname + "/EmailTemplates/AdminDeleteBlog.ejs",
    { blogId: options.blogId, blogTitle: options.blogTitle }
  );

  const message = {
    to: options.email,
    from: `Devlog ${sendingEmail}`,
    subject: options.subject,
    html: emailTemplate,
  };

  await transporter.sendMail(message);
};

const adminFeaturedBlog = async (options) => {
  const emailTemplate = await ejs.renderFile(
    __dirname + "/EmailTemplates/AdminFeaturedBlog.ejs",
    { blogId: options.blogId, blogTitle: options.blogTitle, text: options.text }
  );

  const message = {
    to: options.email,
    from: `Devlog ${sendingEmail}`,
    subject: options.subject,
    html: emailTemplate,
  };

  await transporter.sendMail(message);
};

const adminUpdateOrder = async (options) => {
  const emailTemplate = await ejs.renderFile(
    __dirname + "/EmailTemplates/AdminUpdateOrder.ejs",
    { orderId: options.orderId, text: options.text }
  );

  const message = {
    to: options.email,
    from: `Devlog ${sendingEmail}`,
    subject: options.subject,
    html: emailTemplate,
  };

  await transporter.sendMail(message);
};

const adminDeleteReview = async (options) => {
  const emailTemplate = await ejs.renderFile(
    __dirname + "/EmailTemplates/AdminDeleteReview.ejs",
    {
      productName: options.productName,
      rating: options.rating,
      comment: options.comment,
    }
  );

  const message = {
    to: options.email,
    from: `Devlog ${sendingEmail}`,
    subject: options.subject,
    html: emailTemplate,
  };

  await transporter.sendMail(message);
};

const userPostReview = async (options) => {
  const emailTemplate = await ejs.renderFile(
    __dirname + "/EmailTemplates/UserPostReview.ejs",
    {
      userName: options.userName,
      productName: options.productName,
      rating: options.rating,
      comment: options.comment,
    }
  );

  const message = {
    to: options.email,
    from: `Devlog ${sendingEmail}`,
    subject: options.subject,
    html: emailTemplate,
  };

  await transporter.sendMail(message);
};

const userCreated = async (options) => {
  const emailTemplate = await ejs.renderFile(
    __dirname + "/EmailTemplates/UserCreate.ejs",
    {
      userName: options.userName,
      userEmail: options.userEmail,
    }
  );

  const message = {
    to: options.email,
    from: `Devlog ${sendingEmail}`,
    subject: options.subject,
    html: emailTemplate,
  };

  await transporter.sendMail(message);
};

module.exports = {
  forgotPassword,
  orderSuccess,
  blogSuccess,
  deleteBlog,
  adminBlockUser,
  adminUnBlockUser,
  adminFeaturedBlog,
  adminDeleteBlog,
  adminUpdateOrder,
  adminDeleteReview,
  userPostReview,
  userCreated,
};
