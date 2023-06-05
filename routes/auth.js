const { Router } = require("express");
const { signup, verifyOTP } = require("../controllers/auth");
const router = Router();

router.get("/signup", signup);
router.post("/verifyOtp", verifyOTP);
module.exports = router;
