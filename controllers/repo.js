

const addRepository = async (repoModel, data) => {
  try {
    await repoModel.create(data)
    return { created: true, message: "succesfull" };
  } catch (e) {
    //console.log(__filename, e)
    return { created: false, message: e }
  }
}

module.exports = {
  addRepository
}
