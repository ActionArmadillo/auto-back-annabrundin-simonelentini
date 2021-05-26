import * as reservation from '../helpers/reservationHelper'

describe('Test suite for the backend tests of Hotel site (Rooms)', () => {
    beforeEach(() => {
        cy.login()
    })

    afterEach(() => {
        cy.logout()
    });


    it('TC09 - Create new Reservation', () => {
        reservation.createReservation()
    })

    it('TC10 - Edit and Delete last Reservation', () => {
        reservation.editLastReservation()
        reservation.deleteLastReservation()
    })
})