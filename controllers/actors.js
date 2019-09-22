
const { actors } = require("../models")

var getAllActors = () => {

};

const fetchActor = async (id, actorModel) => {
	const result = await actorModel.findByPk(id)
	return result == null ? null : result.dataValues
}

var updateActor = async (req, resp) => {
	const { avatar_url, id, login } = req.body
	console.log(req.body)
	const actor = await fetchActor(id, actors)
	if (!actor) {
		resp.statusCode = 404
		resp.end()
	} else if (actor.login != login) {
		resp.statusCode = 400
		resp.end()
	} else {
		const updated = await actors.update(
			{ avatar_url, id, login },
			{ where: { id } }
		)
		if (updated[0]) {
			resp.statusCode = 200
		}
		resp.end()
	}
};

var getStreak = () => {

};

const addActor = async (actors, data) => {
	try {
		await actors.create(data)
		return { created: true, message: "succesfull" };
	} catch (e) {
		//console.log(__filename, e)
		return { created: false, message: e }
	}
}

module.exports = {
	addActor,
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};
