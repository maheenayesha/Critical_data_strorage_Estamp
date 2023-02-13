const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const FirController = require('../controllers/firs');

router.get("/", FirController.firs_get_all);

router.post("/", FirController.fir_create);

router.get("/:firId", FirController.fir_get);

router.get("/search/:firsearch", FirController.fir_search);

router.patch("/:firId", FirController.fir_update_preprocess);

// router.delete("/:productId", checkAuth, FirController.products_delete);

module.exports = router;
