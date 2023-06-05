async function sendSMS(phoneNumbers, otp) {
  var unirest = require("unirest");

  var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

  req.query({
    authorization: process.env.FAST2SMS_API_KEY,
    variables_values: otp,
    route: "otp",
    numbers: phoneNumbers,
  });

  req.headers({
    "cache-control": "no-cache",
  });

  req.end(function (res, next) {
    if (res.error)
      return next({ status: 400, message: "Phone number already exists" });

    console.log(res.body);
  });
}

module.exports = {
  sendSMS,
};
