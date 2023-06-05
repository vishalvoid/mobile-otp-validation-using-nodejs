const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    otp: String,
  },
  { timestamps: true }
);

module.exports = model("User", schema);
