const validator = require("validator");
const User = require("../Models/user");
const bcrypt = require("bcryptjs");

const logInValidations = async (data, user) => {
  const { email, password } = data;

  let errors = {};

  if (!user) {
    errors.email = "User Not Exits Against this Email";
  }

  if (email && !validator.isEmail(email)) {
    errors.email = "Please enter valid email address.";
  }

  if (!email) {
    errors.email = "Please Enter Your Email.";
  }

  if (!password) {
    errors.password = "Please Enter Your Password.";
  }

  if (user) {
    const isValidate = await user.comparePassword(password);

    if (!isValidate) {
      errors.password = "Please Enter a Correct Password.";
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length,
  };
};

module.exports = logInValidations;
