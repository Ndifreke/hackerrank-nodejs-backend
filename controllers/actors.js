
const { actors, sequelize } = require("../models")
const { fetchEvents } = require("./events")
const differenceInDays = require("date-fns/differenceInDays/index")

var getAllActors = async (req, resp) => {
	const sql =
		`SELECT DISTINCT a.login, a.avatar_url 
		 FROM actors a 
		 LEFT JOIN events e 
		 ON a.id = e.actor_id 
		 GROUP BY a.login, a.avatar_url 
		 ORDER BY COUNT(e.actor_id) DESC, a.login ASC`
	const res = await sequelize.query(sql)
	resp.json(res[0])
	// console.log(Object.keys(res[0]))
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

const getConsecutiveDays = (actorEventDays) => {
	const consecutiveDaysOfActor = []
	for (actorID in actorEventDays) {
		const sortDate = actorEventDays[actorID].sort((prev, next) => new Date(prev) >= new Date(next))
		const actorsData = { id: actorID, consecutiveDays: 0 }
		//reduce function will not run array with 1 element, just assigned 1 dates with zero
		if (sortDate.length == 1) {
			consecutiveDaysOfActor.push(actorsData)
			continue
		} else {
			sortDate.reduce((accum, currentDate, currentIndex) => {
				const early = new Date(sortDate[currentIndex - 1])
				const current = new Date(currentDate)
				if (differenceInDays(current, early) == 1) {
				actorsData.consecutiveDays+= 1
				}
			});
			consecutiveDaysOfActor.push(actorsData)
		}
	}
	console.log(consecutiveDaysOfActor)
	return consecutiveDaysOfActor
}

const mapActorsAndEventDays = (eventDataValue) => {

	const actorsWithEventDates = eventDataValue.reduce(function (accum, current) {
		const id = current.actor.id
		if (id in accum) {
			const dates = accum[id]
			dates.push(current.created_at)
			accum[id] = dates
		} else {
			accum[id] = [current.created_at]
		}
		return accum
	}, {})
	return actorsWithEventDates

}

const orderActorWithSimilarTimeStreakByLatestStreak = (actorsAndStreaksCount, actorsEventDays) => {
	const sortedStreak = []
	console.log(actorsAndStreaksCount)
	const actorWithSimilarStreak = {}
	for (idInStreakMap in actorsAndStreaksCount) {
		const streak = actorsAndStreaksCount[idInStreakMap]
		if (sortedStreak.indexOf(streak) != -1)
			continue
		sortedStreak.push(streak)
		//collect actors with similar streak and sort them
		console.log(streak)
		for (idInDaysMapping in actorsEventDays) {
			if (idInDaysMapping === idInStreakMap && actorsAndStreaksCount[idInStreakMap] == streak) {
				actorWithSimilarStreak[idInStreakMap] = actorsEventDays[idInDaysMapping]
				console.log(actorWithSimilarStreak)
			}
			//	console.log("currently checking ID " + idInStreakMap + " and streak " + streak)
		}
	}
	//console.log(sortedStreak)



}

var getStreak = async (req, resp) => {
	const event = await fetchEvents()
	const actorEventDaysMap = mapActorsAndEventDays(event)
	const actorWithConsecutiveDays = getConsecutiveDays(actorEventDaysMap)
	orderActorWithSimilarTimeStreakByLatestStreak(actorWithConsecutiveDays, actorEventDaysMap)
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
