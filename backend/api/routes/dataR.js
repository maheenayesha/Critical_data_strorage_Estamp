const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const DataController = require('../controllers/dataC');
const MultichainController = require("../controllers/multichainC");
// Handle incoming GET requests to /orders
router.get("/", DataController.data_get_all);
router.get("/multichain_get_all/", MultichainController.multichain_get_all);
router.get("/multichainpublish/", MultichainController.multichain_publish_item);
router.get("/multichain/getitem/:stream/:txid/", MultichainController.multichain_getstream_item);



router.post("/", DataController.data_create);

router.get("/:id", DataController.data_get);

// router.delete("/:id", checkAuth, DataController.orders_delete_order);

module.exports = router;