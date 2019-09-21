var chai = require('chai');
var expect = chai.expect;
const { data, createActor, createRepository } = require("../data/seeds")
const { closeConnection } = require("../helper")
const { actors, repositories, sequelize } = require("../../models/index")

beforeEach(async function () {
  await sequelize.sync({ force: true })
})

describe("create repository", function () {
  it("should create a git repository", async function () {
    await createActor(actors, data)
    data.repo.actor_id = data.id
    const result = await createRepository(repositories, data.repo)
    expect(result.created).to.be.true
  })

  //TODO Test the that deleting an Actor has their record removed
})

after(async function () {
  closeConnection(sequelize)
})

