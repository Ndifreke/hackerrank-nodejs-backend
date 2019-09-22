var chai = require('chai');
var expect = chai.expect;
const { data, createActor, createEvent, createRepository } = require("../helper")
const { closeConnection } = require("../helper")

const { actors, events, repositories, sequelize } = require("../../models/index")

beforeEach(async function () {
  await sequelize.sync({ force: true })
})

const addEvent = async () => {
  await createActor(actors, data.actor)
  await createRepository(repositories, data.repo)
  return await createEvent(events, data)
}

describe("event database", function () {
  it("should create an event entry", async function () {
    const result = await addEvent()
    expect(result.created).to.be.true
  })

  it("should cascade delete event when actor is deleted", async function () {
    const result = await addEvent()
    expect(result.created).to.be.true
    const deleteActorCount = await actors.destroy({
      where: { id: data.actor.id },
      cascade: true
    })
    expect(deleteActorCount).to.equal(1)
    const eventResult = await events.findOne({ where: { actor_id: data.id } })
    expect(eventResult).to.null
  })
})

after(async function () {
  closeConnection(sequelize)
})

