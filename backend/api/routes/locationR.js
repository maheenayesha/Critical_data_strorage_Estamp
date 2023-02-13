const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const LocationController = require('../controllers/locationC');
// const MultichainController = require("../controllers/multichainC");
// Handle incoming GET requests to /orders
router.get("/", LocationController.location_get_all);


router.post("/", LocationController.location_create);
router.patch("/:id", LocationController.location_update);
// router.get("/:id", LocationController.data_get);

router.delete("/:id", LocationController.city_delete); //this will delete city for locations use update ..
//remove from obj & update parent 

module.exports = router;