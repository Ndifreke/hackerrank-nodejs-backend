var chai = require('chai');
var expect = chai.expect;
const { data, createActor } = require("../helper")
const { closeConnection } = require("../helper")

const { actors, sequelize } = require("../../models/index")

beforeEach(async function () {
  await sequelize.sync({ force: true })
})

describe("actor database", function () {
  it("should create an actor entry", async function () {
    const repo = await createActor(actors, data)
    expect(repo.created).to.be.true
  })

  it("should delete an actor", async function () {
    const repo = await createActor(actors, data)
    if(!repo.created){
      throw new Error(repo.message)
    }
    const deleteCount = await actors.destroy({
      where: { id: data.id },
      cascade: true
    })
    expect(deleteCount).to.equal(1)
  })
})

after(async function () {
  closeConnection(sequelize)
})

