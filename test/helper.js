module.exports.closeConnection = async function (sequelize) {
  try {
    await sequelize.close()
  } catch (e) {
    //connection closed already or does not exist
  }
}

const actorData = {
  id: 4,
  type: "PushEvent",
  actor_id: 5,
  repository_id: 6,
  created_at: "2015-10-04 22:13:31",
  actor: {
    id: 5,
    login: "joel34",
    avatar_url: "https://avatars.com/2471989"
  },
  repo: {
    id: 6,
    name: "joel34/dolorem-ducimus",
    url: "https://github.com/joel34/dolorem-ducimus",
    actor_id: 5
  }
}

module.exports.data = actorData

module.exports.createActor = async (actors, actorData) => {
  try {
    await actors.create(actorData)
    return { created: true, message: "succesfull" };
  } catch (e) {
    //console.log(__filename, e.message)
    return { created: false, message: e.message }
  }
}

module.exports.createRepository = async (repo, data) => {
  try {
    await repo.create(data)
    return { created: true, message: "succesfull" };
  } catch (e) {
   // console.log(__filename, e.message)
    return { created: false, message: e.message }
  }
}

module.exports.createEvent = async (event, data) => {
  try {
    await event.create(data)
    return { created: true, message: "succesfull" };
  } catch (e) {
   // console.log(__filename, e.message)
    return { created: false, message: e.message }
  }
}
