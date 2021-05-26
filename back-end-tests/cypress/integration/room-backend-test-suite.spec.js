import * as room from '../helpers/roomsHelper'

describe('Test suite for the backend tests of Hotel site (Rooms)', () => {
    beforeEach(() => {
        cy.login()
    })

    afterEach(() => {
        cy.logout()
    });

    it('TC01 - Retrieve rooms list', () => {
        cy.getRooms().then((response => {
            expect(response.status).to.eq(200)
            expect(response.body).not.be.empty
        }))
    })

    it('TC02 - Create a new Room', () => {
        room.createRoom()
    })

    it('TC03 - Edit last Room', () => {
        room.editLastRoom()
    })

    it('TC04 - Delete last Room', () => {
        room.deleteLastRoom()
    })
})