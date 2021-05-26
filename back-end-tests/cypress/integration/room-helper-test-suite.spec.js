import * as room from '../helpers/roomsHelper'

describe('Test suite for the backend tests of Hotel site (Rooms)', () => {
    beforeEach(() => {
        cy.login()
    })

    afterEach(() => {
        cy.logout()
    });


    it('create room and validate the result', () => {
        room.createRoom()
    })

    it('edit last room and validate the result', () => {
        room.editLastRoom()
    })

    it('delete last room and validate the result', () => {
        room.deleteLastRoom()
    })

})