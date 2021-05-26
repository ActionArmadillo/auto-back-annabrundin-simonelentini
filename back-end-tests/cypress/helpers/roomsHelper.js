const faker = require('faker')

function createRoomBody() {
    let roomBody = {
        "id": "",
        "created": "",
        "category": faker.random.arrayElement(["double", "single", "twin"]),
        "floor": faker.datatype.number({ min: 1, max: 50 }),
        "number": faker.datatype.number({ min: 1, max: 1000 }),
        "available": true,
        "price": faker.datatype.number({ min: 1000, max: 10000 }),
        "features": selectFeatures(faker.datatype.number({ min: 1, max: 4 }))
    }
    return roomBody
}

function selectFeatures(number) {
    const features = []
    while (number > 0) {
        let feature = faker.random.arrayElement(["balcony", "ensuite", "sea_view", "penthouse"]);
        if (features.includes(feature) === false) {
            features.push(feature)
            number--
        }
    }
    return features
}

function createRoom() {
    var room = createRoomBody()
    cy.createNewRoom(room).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))

    cy.getRooms().then((response => {
        expect(response.status).to.eq(200)
        let lastRoomID = response.body[response.body.length - 1].id
        var roomData = response.body[lastRoomID - 1]

        expect(roomData.id).is.greaterThan(2)
        expect(roomData.created).is.not.empty
        expect(roomData.category).to.eq(room.category)
        expect(roomData.floor).to.eq(room.floor)
        expect(roomData.number).to.eq(room.number)
        expect(roomData.available).to.eq(room.available)
        expect(roomData.price).to.eq(room.price)
        for (var i = 0; i < roomData.features.length; i++) {
            expect(roomData.features[i]).to.equal(room.features[i])
        }
    }))
}

function editLastRoom() {
    let roomBody = {}
    cy.getRooms().then((response => {
        let lastRoomID = response.body[response.body.length - 1].id
        let created = response.body[lastRoomID - 1].created
        let category = faker.random.arrayElement(["double", "single", "twin"])
        let floor = faker.datatype.number({ min: 1, max: 50 })
        let number = faker.datatype.number({ min: 1, max: 1000 })
        let price = faker.datatype.number({ min: 1000, max: 10000 })
        let features = selectFeatures(faker.datatype.number({ min: 1, max: 4 }))
        roomBody = {
            "id": lastRoomID,
            "created": created,
            "category": category,
            "floor": floor,
            "number": number,
            "available": true,
            "price": price,
            "features": features
        }
        cy.editRoom(lastRoomID, roomBody).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
        }))
    }))

    cy.getRooms().then((response => {
        expect(response.status).to.eq(200)
        let lastRoomID = response.body[response.body.length - 1].id
        var roomData = response.body[lastRoomID - 1]

        expect(roomData.category).to.eq(roomBody.category)
        expect(roomData.floor).to.eq(roomBody.floor)
        expect(roomData.number).to.eq(roomBody.number)
        expect(roomData.available).to.eq(roomBody.available)
        expect(roomData.price).to.eq(roomBody.price)
        for (var i = 0; i < roomData.features.length; i++) {
            expect(roomData.features[i]).to.equal(roomBody.features[i])
        }
    }))
}

function deleteLastRoom() {
    cy.getRooms().then((response => {
        expect(response.status).to.eq(200)
    })).then((response => {
        let lastRoomID = response.body[response.body.length - 1].id
        cy.deleteRoom(lastRoomID).then((response => {
            expect(response.status).to.eq(200)
        }))

        cy.getRooms().then((response => {
            expect(response.status).to.eq(200)
            let lastRoomID = response.body[response.body.length - 1].id
            var roomData = response.body[lastRoomID - 1]
            expect(roomData.id).to.be.lessThan(3)
        }))
    }))
}

module.exports = {
    createRoom,
    editLastRoom,
    deleteLastRoom
}