/// <reference types = "cypress" />


//-----------------------------------------------------------------//
//                          variables                              //
//-----------------------------------------------------------------//

describe('Test suite for the backend tests of Hotel site', () => {

    afterEach(() => {
        cy.logout()
    });

    /*
    it('TC01 - Login to the application', () => {
        const USER_CREDENTIALS = {
            "username": "tester01",
            "password": "GteteqbQQgSr88SwNExUQv2ydb7xuf8c"
        }

        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/login',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(USER_CREDENTIALS)
        }).then((response => {
            expect(response.status).to.eq(200)
            Cypress.env({ loginToken: response.body })
            cy.log(response.body)
        }))
    })
    */


    it('TC03 - Create a new Room', () => {
        cy.login().then((response => {
            cy.log(Cypress.env().loginToken)

            cy.createNewRoom("", "", "double", 44441, 133, true, 440, ["balcony", "ensuite"]).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            }))

            cy.getRooms().then((response => {

                expect(response.status).to.eq(200)
                let lastID = response.body[response.body.length - 1].id
                cy.log(JSON.stringify(response.body[lastID]))
            }))
        }))
    })

    it('TC04 - Edit and Delete last Room', () => {
        cy.login().then((response => {
            cy.log(Cypress.env().loginToken)

            cy.getRooms().then((response => {
                expect(response.status).to.eq(200)
                //cy.log(JSON.stringify(response.body[2]))
            })).then((response => {
                let lastID = response.body[response.body.length - 1].id
                cy.log(lastID)
                cy.editRoom(lastID, "", "double", 5, 555, true, 1024, ["ensuite", "sea_view"]).then((response => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body[2]))
                }))

            }))
        }))

        cy.getRooms().then((response => {
            expect(response.status).to.eq(200)
            //cy.log(JSON.stringify(response.body[2]))
        })).then((response => {
            let lastID = response.body[response.body.length - 1].id
            cy.log(lastID)
            cy.deleteRoom(lastID).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body[2]))
            }))

        }))
    })

})