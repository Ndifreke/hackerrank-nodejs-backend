module.exports.closeConnection = async function (sequelize) {
  try {
    await sequelize.close()
  } catch (e) {
    //connection closed already or does not exist
  }
}

const actorData = {
  id: 3466404,
  login: "khunt",
  avatar_url: "https://avatars.com/3466404",
  repo: {
    id: 478747,
    name: "ngriffin/rerum-aliquam-cum",
    url: "https://github.com/ngriffin/rerum-aliquam-cum",
    created_at: "2013-04-17 04:13:31"
  },
  event: {
    type: "Pull Request",
    id: 987932
  }
}

module.exports.data = actorData

module.exports.createActor = async (actors, actorData) => {
  try {
    await actors.create(actorData)
    return { created: true, message: "succesfull" };
  } catch (e) {
    return { created: false, message: e.message }
  }
}

module.exports.createRepository = async (repo, data) => {
  try {
    await repo.create(data)
    return { created: true, message: "succesfull" };
  } catch (e) {
    console.log(e)
    return { created: false, message: e.message }
  }
}

module.exports.createEvent = async (event, data) => {
  try {
    await event.create(data)
    return { created: true, message: "succesfull" };
  } catch (e) {
    console.log(e)
    return { created: false, message: e.message }
  }
}
