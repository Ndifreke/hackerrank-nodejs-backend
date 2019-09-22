var express = require('express');
var router = express.Router();

const { updateActor } = require("../controllers/actors")


// Routes related to actor.
router.put("/", updateActor)
module.exports = router;
