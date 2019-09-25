const differenceInDays = require("date-fns/differenceInDays/index")
const result = [
    {
        "id": 11,
        "type": "PushEvent",
        "actor": {
            "id": 1,
            "login": "a",
            "avatar_url": "https://avatars.com/3466404"
        },
        "repo": {
            "id": 1,
            "name": "ngriffin/rerum-aliquam-cum",
            "url": "https://github.com/ngriffin/rerum-aliquam-cum"
        },
        "created_at": "2013-04-17 04:13:31"
    },
    {
        "id": 12,
        "type": "PushEvent",
        "actor": {
            "id": 1,
            "login": "a",
            "avatar_url": "https://avatars.com/3466404"
        },
        "repo": {
            "id": 1,
            "name": "ngriffin/rerum-aliquam-cum",
            "url": "https://github.com/ngriffin/rerum-aliquam-cum"
        },
        "created_at": "2013-04-18 04:13:32"
    },
    {
        "id": 21,
        "type": "PushEvent",
        "actor": {
            "id": 2,
            "login": "b",
            "avatar_url": "https://avatars.com/3466404"
        },
        "repo": {
            "id": 2,
            "name": "ngriffin/rerum-aliquam-cum",
            "url": "https://github.com/ngriffin/rerum-aliquam-cum"
        },
        "created_at": "2013-04-18 04:13:33"
    },
    {
        "id": 22,
        "type": "PushEvent",
        "actor": {
            "id": 2,
            "login": "b",
            "avatar_url": "https://avatars.com/3466404"
        },
        "repo": {
            "id": 2,
            "name": "ngriffin/rerum-aliquam-cum",
            "url": "https://github.com/ngriffin/rerum-aliquam-cum"
        },
        "created_at": "2013-04-18 04:13:34"
    },
    {
        "id": 22,
        "type": "PushEvent",
        "actor": {
            "id": 3,
            "login": "b",
            "avatar_url": "https://avatars.com/3466404"
        },
        "repo": {
            "id": 2,
            "name": "ngriffin/rerum-aliquam-cum",
            "url": "https://github.com/ngriffin/rerum-aliquam-cum"
        },
        "created_at": "2013-04-18 04:13:34"
    }
]

const sortActorsByConsecutiveEvent = (eventDataValue) => {
    const dateEventStreak = {}
    //     eventDataValue.forEach((currentEvent) => {
    //         const sorted = []
    //         const actorsEvent = eventDataValue.filter(filteredEvent => {
    //           //  console.log(sorted)
    //             if (sorted.indexOf(filteredEvent.id) != -1) {
    //                 return false
    //             } else {
    //                 sorted.push(filteredEvent.id)
    //                 return currentEvent.id == filteredEvent.id
    //             }
    //     })
    //     console.log(actorsEvent)
    // })
    const sorted = []
    const eventsWithDates = {}
    // eventDataValue.forEach((event) => {
    //     console.log(event['id'] in eventsWithDates) 
    //     if (event['id'] in eventsWithDates) {
    //         eventsWithDates[event.id].push(event["created_at"])
    //     } else {
    //         eventsWithDates[event.id] = [event["created_at"]]
    //         console.log(eventsWithDates)
    //     }
    // })


    const getConsecutiveDays = (actorEventDays) => {
        const consecutiveDaysOfActor = {}
        for (actorID in actorEventDays) {
            const sortDate = actorEventDays[actorID].sort((prev, next) => new Date(prev) >= new Date(next))
            consecutiveDaysOfActor[actorID] = 0
            //reduce function will not run array with 1 element, just assigned 1 dates with zero
            if (sortDate.length == 1) {
                consecutiveDaysOfActor[actorID] = 0
            } else {
                sortDate.reduce((accum, currentDate, currentIndex) => {
                    const early = new Date(sortDate[currentIndex - 1])
                    const current = new Date(currentDate)
                    if (differenceInDays(current, early) == 1) {
                        consecutiveDaysOfActor[actorID] += 1
                    }
                });
            }
        }
        return consecutiveDaysOfActor
    }

    const reduc = eventDataValue.reduce(function (accum, current) {
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
    getConsecutiveDays(reduc)
}


sortActorsByConsecutiveEvent(result)