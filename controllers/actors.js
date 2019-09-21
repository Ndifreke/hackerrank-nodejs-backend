
var getAllActors = () => {

};

var updateActor = () => {

};

var getStreak = () => {

};

const addActor = async (actors, data) => {
	try {
		await actors.create(data)
		return { created: true, message: "succesfull" };
	} catch (e) {
		console.log(__filename, e)
		return { created: false, message: e }
	}
}

module.exports = {
	addActor,
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















