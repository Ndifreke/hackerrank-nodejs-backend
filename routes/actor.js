var express = require('express');
var router = express.Router();

const { updateActor, getAllActors } = require("../controllers/actors")


// Routes related to actor.
router.put("/", updateActor)
router.get("/", getAllActors)
module.exports = router;
