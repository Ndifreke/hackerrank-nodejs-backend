module.exports.closeConnection = async function (sequelize) {
  try {
    await sequelize.close()
  } catch (e) {
    //connection closed already or does not exist
  }
}
