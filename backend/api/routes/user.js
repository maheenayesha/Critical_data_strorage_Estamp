const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');
router.get("/count", UserController.user_count);
router.post("/signup", UserController.user_signup);
router.get("/fircount", UserController.fir_count);

router.post("/login", UserController.user_login);

router.delete("/:userId", checkAuth, UserController.user_delete);

module.exports = router;
