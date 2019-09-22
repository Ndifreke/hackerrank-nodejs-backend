var express = require('express');
var router = express.Router();
const { event } = require("../controllers/index")


// Routes related to event

router.post("/", event.addEvent)
router.get("/", event.getAllEvents)
router.get("/actors/:actorID", event.getByActor)
module.exports = router;
