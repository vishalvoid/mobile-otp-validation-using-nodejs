const User = require("../models/user");
const { generateOTP } = require("../utils/otp");
const { sendSMS } = require("../utils/sms");

const signup = async (req, res, next) => {
  try {
    // extract phone number from request body
    const { phone } = req.body;

    // check duplicate phone number
    const user = await User.findOne({
      phone,
    });

    if (user) {
      return next({ status: 400, message: "Phone number already exists" });
    }

    // create new user
    const newUser = new User({
      phone,
    });

    // generate 6 digit  otp
    const otp = generateOTP(6);

    // save otp in db

    newUser.otp = otp;
    await newUser.save();

    // send otp

    await sendSMS(phone, otp);

    return res.status(201).json({
      status: "success",
      message: "6 digit otp sent on your phone number.",
    });
  } catch (error) {
    next(error);
  }
};

const verifyOTP = async (req, res, next) => {
  try {
    // extract otp and phone number from request body
    const { phone, otp } = req.body;

    // verify phone number exists or not
    const user = await User.findOne({
      phone,
    });

    if (!user) {
      return next({ status: 400, message: "Phone number is incorrect" });
    }

    // verify otp

    if (user.otp !== otp) {
      return next({ status: 400, message: "Incorrect OTP" });
    }

    // delete otp

    user.otp = "";
    await user.save();

    return res.status(201).json({
      status: "success",
      message: "OTP verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  verifyOTP,
};
