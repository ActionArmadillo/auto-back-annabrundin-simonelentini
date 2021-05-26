const faker = require('faker')

function createReservationBody() {
    let reservationBody = {
        "id": "",
        "created": "",
        "start": faker.date.between("2021-06-01", "2021-06-15").toISOString(),
        "end": faker.date.between("2021-07-01", "2021-07-15").toISOString(),
        "client": 1,
        "room": 1,
        "bill": 1
    }
    cy.log("show me the money " + reservationBody.start)
    return reservationBody
}

function createReservation() {
    var reservation = createReservationBody()
    cy.createNewReservation(reservation).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))

    cy.getReservations().then((response => {
        expect(response.status).to.eq(200)
        let lastReservationID = response.body[response.body.length - 1].id
        var reservationData = response.body[lastReservationID - 1]

        expect(reservationData.id).is.greaterThan(1)
        expect(reservationData.created).is.not.empty
        expect(reservationData.start).to.eq(reservation.start)
        expect(reservationData.end).to.eq(reservation.end)
        expect(reservationData.client).to.eq(reservation.client)
        expect(reservationData.room).to.eq(reservation.room)
        expect(reservationData.bill).to.eq(reservation.bill)
    }))
}

function editLastReservation() {
    let reservationBody = {}
    cy.getReservations().then((response => {
        let lastReservationID = response.body[response.body.length - 1].id
        let created = response.body[lastReservationID - 1].created
        let start = faker.date.between("2021-06-01", "2021-06-15").toISOString()
        let end = faker.date.between("2021-07-01", "2021-07-15").toISOString()
        let client = 1
        let room = 1
        let bill = 1
        reservationBody = {
            "id": lastReservationID,
            "created": created,
            "start": start,
            "end": end,
            "client": client,
            "room": room,
            "bill": bill
        }
        cy.editReservation(lastReservationID, reservationBody).then((response => {
            expect(response.status).to.eq(200)
        }))
    }))

    cy.getReservations().then((response => {
        expect(response.status).to.eq(200)
        let lastReservationID = response.body[response.body.length - 1].id
        var reservationData = response.body[lastReservationID - 1]

        expect(reservationData.start).to.eq(reservationBody.start)
        expect(reservationData.end).to.eq(reservationBody.end)
    }))
}

function deleteLastReservation() {
    cy.getReservations().then((response => {
        expect(response.status).to.eq(200)
    })).then((response => {
        let lastReservationID = response.body[response.body.length - 1].id
        cy.deleteReservation(lastReservationID).then((response => {
            expect(response.status).to.eq(200)
        }))

        cy.getReservations().then((response => {
            expect(response.status).to.eq(200)
            let lastReservationID = response.body[response.body.length - 1].id
            var reservationData = response.body[lastReservationID - 1]

            expect(reservationData.id).to.be.lessThan(2)
        }))

    }))
}

module.exports = {
    createReservation,
    editLastReservation,
    deleteLastReservation
}


