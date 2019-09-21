
const { events } = require("../models/index");

var getAllEvents = () => {

};

var addEvent = () => {

};


var getByActor = () => {

};

/**
 * 
 * @param {*} req 
 * @param {*} resp 
 * @param {*} next 
 */
var eraseEvents = async (req, resp, next) => {
	try {
		await events.destroy({ truncate: true })
		resp.statusCode = 200
		resp.end()
	} catch (e) {
		next(e)
	}
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















