/// <reference types = "cypress" />

//-----------------------------------------------------------------//
//                          test cases                             //
//-----------------------------------------------------------------//

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
        cy.createNewRoom(Object).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
        }))

        cy.getRooms().then((response => {
            expect(response.status).to.eq(200)
            let lastID = response.body[response.body.length - 1].id
            var roomData = response.body[lastID - 1]

            // assert that the new room is created correctly
            expect(roomData.id).is.greaterThan(2)
            expect(roomData.created).is.not.empty
            expect(roomData.category).to.eq("double")
            expect(roomData.floor).to.eq(44441)
            expect(roomData.number).to.eq(133)
            expect(roomData.available).to.be.true
            expect(roomData.price).to.eq(440)
            expect(roomData.features).to.contain("balcony", "ensuite")
        }))
    })

    it('TC03 - Edit last Room', () => {
        cy.getRooms().then((response => {
            expect(response.status).to.eq(200)
        })).then((response => {
            let lastID = response.body[response.body.length - 1].id
            let created = response.body[lastID - 1].created
            //cy.log(JSON.stringify(response.body))
            cy.editRoom(lastID, created, "double", 5, 555, true, 1024, ["ensuite", "sea_view"]).then((response => {
                expect(response.status).to.eq(200)
                //cy.log(JSON.stringify(response.body[2]))
            }))
        }))

        cy.getRooms().then((response => {
            expect(response.status).to.eq(200)
            let lastID = response.body[response.body.length - 1].id
            var roomData = response.body[lastID - 1]

            expect(roomData.floor).to.eq(5)
            expect(roomData.number).to.eq(555)
            expect(roomData.available).to.be.true
            expect(roomData.price).to.eq(1024)
            expect(roomData.features).to.contain("ensuite", "sea_view")
        }))
    })

    it('TC04 - Delete last Room', () => {
        cy.getRooms().then((response => {
            expect(response.status).to.eq(200)
        })).then((response => {
            let lastID = response.body[response.body.length - 1].id
            var roomID = response.body[lastID - 1].id
            cy.log("room id " + roomID)
            cy.deleteRoom(lastID).then((response => {
                expect(response.status).to.eq(200)
            }))
        }))
    })
})