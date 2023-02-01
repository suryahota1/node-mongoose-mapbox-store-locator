const { getStores, createStore } = require("../controllers/store");

const router = require("express").Router();

router.route("/").get(getStores).post(createStore);

module.exports = router;
