const { Router } = require("express");
const { signup, verifyOTP } = require("../controllers/auth");
const router = Router();

router.get("/signup", signup);
router.post("/verify_otp", verifyOTP);
module.exports = router;
