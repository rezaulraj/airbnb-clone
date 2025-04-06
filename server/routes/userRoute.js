const router = require("express").Router();
const userAuth = require("../controllers/userAuth");
router.post("/api/register", userAuth.user_register);
router.post("/api/login", userAuth.login);

// ============ Profile get ===============
router.get("/api/profile", userAuth.decode_user);
//  =============== logout ===============
router.post("/logout", userAuth.logout);

module.exports = router;
