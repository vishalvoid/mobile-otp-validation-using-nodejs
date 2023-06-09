const User = require("../models/user");
const { generateOTP } = require("../utils/otp");
const { sendSMS } = require("../utils/sms");

const signup = async (req, res, next) => {
  try {
    // destructuring
    const { phone } = req.body;

    // duplicate user
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

    // calling generate otp function which will generate otp.
    const otp = generateOTP(6);

    // storing otp in database.
    newUser.otp = otp;
    await newUser.save();

    // otp send method
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
    // destructuring to get phone and op from body;
    const { phone, otp } = req.body;

    // checking if phone number exists or not
    const user = await User.findOne({
      phone,
    });

    if (!user) {
      return next({ status: 400, message: "Incorrect Phone Number" });
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
