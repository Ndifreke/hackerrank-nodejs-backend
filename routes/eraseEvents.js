var express = require('express');
var router = express.Router();

const { event } = require("../controllers/index")
router.delete("/", event.eraseEvents)
// Route related to delete events

module.exports = router;
