/// <reference types = "cypress" />

//-----------------------------------------------------------------//
//                          test cases                             //
//-----------------------------------------------------------------//

describe('Test suite for the backend tests of Hotel site', () => {
    beforeEach(() => {
        cy.login()
    })

    afterEach(() => {
        cy.logout()
    })

    it('TC09 - Create a new Reservation', () => {
        cy.createNewReservation("", "", "2021-05-30", "2021-06-06", 1, 1, 1).then((response => {
            expect(response.status).to.eq(200)
        }))

        cy.log('Retrieve Reservations list')
        cy.getReservations().then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
            let lastID = response.body[response.body.length - 1].id
            var reservationData = response.body[lastID - 1]

            // assert that the new Reservation is created correctly            
            expect(reservationData.id).eq(2)
            expect(reservationData.created).is.not.empty
            expect(reservationData.start).to.eq("2021-05-30")
            expect(reservationData.end).to.eq("2021-06-06")
            expect(reservationData.client).to.eq(1)
            expect(reservationData.room).to.eq(1)
            expect(reservationData.bill).to.eq(1)
        }))
    })

    it('TC10 - Edit and delete last Reservation', () => {
        cy.getReservations().then((response => {
            expect(response.status).to.eq(200)
        })).then((response => {
            let lastID = response.body[response.body.length - 1].id
            let created = response.body[response.body.length - 1].created
            cy.editReservation(lastID, created, "2021-05-25", "2021-06-30", 1, 1, 1).then((response => {
                expect(response.status).to.eq(200)
            }))
        }))

        cy.getReservations().then((response => {
            // assert that the last revesrvation is updated correctly
            expect(response.status).to.eq(200)
            let lastID = response.body[response.body.length - 1].id
            var reservationData = response.body[lastID - 1]

            expect(reservationData.id).eq(lastID)
            expect(reservationData.created).is.not.empty
            expect(reservationData.start).to.eq("2021-05-25")
            expect(reservationData.end).to.eq("2021-06-30")
            expect(reservationData.client).to.eq(1)
            expect(reservationData.room).to.eq(1)
            expect(reservationData.bill).to.eq(1)

            cy.deleteReservation(lastID).then((response => {
                expect(response.status).to.eq(200)
            }))
        }))

        cy.getReservations().then((response => {
            expect(response.status).to.eq(200)
            let lastID = response.body[response.body.length - 1].id
            var reservationData = response.body[lastID - 1]
            expect(reservationData.id).to.eq(1)
        }))

    })
})
