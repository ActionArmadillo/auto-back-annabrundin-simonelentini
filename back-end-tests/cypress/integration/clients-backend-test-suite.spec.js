/// <reference types = "cypress" />


//-----------------------------------------------------------------//
//                          variables                              //
//-----------------------------------------------------------------//


//-----------------------------------------------------------------//
//                          test cases                             //
//-----------------------------------------------------------------//

describe('Test suite for the backend tests of Hotel site (Clients)', () =>{
    beforeEach(() => {
        cy.login()
    })

    afterEach(() => {
        cy.logout()
    });

    it("TCO5 - Create new client", () => {

        // Get the clients list
        cy.getClients().then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body))
        });

        //Create a client request

        cy.createNewClient("", "", "Herr Gurka", "green@giant.com", "2525 6677 3131")
            .then((response => {
                expect(response.status).to.eq(200)
            }))

        // the check last created client
        cy.getClients().then((response => {
            expect(response.status).to.eq(200)
            let lastID = response.body[response.body.length - 1].id

            cy.getClient(lastID).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body))
                expect(response.body.name).to.eq("Herr Gurka")
                expect(response.body.email).to.eq("green@giant.com")
                expect(response.body.telephone).to.eq("2525 6677 3131")
            });
        }))
    })

    it("TCO6 - Edit client and delete ", () => {

        // Get the last client 
        cy.getClients().then((response => {
            expect(response.status).to.eq(200)
            let lastID = response.body[response.body.length - 1].id

            cy.getClient(lastID).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body))
            });


            cy.editClient(lastID, "2020-01-05T12:00:00.000Z", "Herr Gurka", "long@giant.com", "1111 2222 3333")
                .then((response => {
                    expect(response.status).to.eq(200)

                }))

            // Check the edited last client 
            cy.getClient(lastID).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.created).to.eq("2020-01-05T12:00:00.000Z")
                expect(response.body.name).to.eq("Herr Gurka")
                expect(response.body.email).to.eq("long@giant.com")
                expect(response.body.telephone).to.eq("1111 2222 3333")
                cy.log(JSON.stringify(response.body))
            })

            // delete the last client
            cy.deleteClient(lastID).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            })).then((response) => {
                cy.getClients().then((response) => {
                    expect(response.status).to.eq(200);
                    cy.log(JSON.stringify(response.body))
                });
            })
        }))
    })
})
