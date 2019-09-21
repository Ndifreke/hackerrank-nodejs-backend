
const { events } = require("../models/index");

var getAllEvents = () => {

};

var addEvent = async (req, resp, next) => {
	const { id, type, actor_id } = req.body;
	//console.log(req.body)
	try {
		await events.create({ id, type, actor_id })
		resp.statusCode = 201
	} catch (e) {
		console.log(e.message)
		resp.statusCode = 400
	}
	resp.end()
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

















