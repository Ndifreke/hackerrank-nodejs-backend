
const { events, actors, repositories } = require("../models/index");
const { addRepository } = require("./repo")
const { addActor } = require("./actors")

var getAllEvents = () => {

};

const createEvent = async (eventsModel, data) => {
	try {
		await eventsModel.create(data)
		return { created: true, message: "succesfull" };
	} catch (e) {
		console.log(__filename, e)
		return { created: false, message: e }
	}
}

var addEvent = async (req, resp, next) => {
	const { id, type, actor: actorData, repo: repoData } = req.body;
	try {
		console.log(req.body)
		await addActor(actors, actorData)
		await addRepository(repositories, { ...repoData, actor_id: actorData.id })

		//to create an event, you need a repo and actor id
		const result = await createEvent(events, {
			id,
			type,
			actor_id: actorData.id,
			repository_id: repoData.id
		})

		if (result.created) {
			resp.statusCode = 201
		} else {
			resp.statusCode = 400
			//	console.log(result.message)
		}
	} catch (e) {
		//internal server Error
		resp.statusCode = 500
		next(req, resp)
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
		//internal server Error
		resp.statusCode = 500
		next(req, resp)
	}
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















