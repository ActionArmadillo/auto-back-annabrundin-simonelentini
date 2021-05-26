import * as reservation from '../helpers/reservationHelper'

describe('Test suite for the backend tests of Hotel site (Rooms)', () => {
    beforeEach(() => {
        cy.login()
    })

    afterEach(() => {
        cy.logout()
    });


    it('create reservation and validate the result', () => {
        reservation.createReservation()
    })

    it('edit last reservation and validate the result', () => {
        reservation.editLastReservation()
    })

    it('delete last reservation and validate the result', () => {
        cy.log('under construction')
    })

})