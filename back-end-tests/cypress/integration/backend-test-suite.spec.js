/// <reference types = "cypress" />

describe("Test suite for the backend tests of Hotel site", () => {

    beforeEach(() => {
        cy.login()
    });

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
        /* cy.request({
             method: 'POST',
             url: 'http://localhost:3000/api/client/new',
             headers: {
                 'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                 'Content-Type': 'application/json'
             },
             body: {
                 "id": "",
                 "created": "",
                 "name": "Herr Gurka",
                 "email": "green@giant.com",
                 "telephone": "2525 6677 3131"
             }*/
        cy.createNewClient("", "", "Herr Gurka", "green@giant.com", "2525 6677 3131")
            .then((response => {
                expect(response.status).to.eq(200)
            }))

        // the check last created client
        cy.getClients().then((response) => {
            expect(response.status).to.eq(200)
            let lastID = response.body[response.body.length - 1].id
            cy.log(lastID)

            cy.getClient(lastID).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            }))

            //list of clients
            cy.getClients().then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body))
            });

            // Delete the created client
            cy.deleteClient(lastID).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            }))
        })

        // Get the clients list (confirm the created client as been deleted)
        cy.getClients().then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body))
        });

    })

    it("TCO6 - Edit client", () => {

        // Get the client ID 1
        cy.getClient(1).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body))
        });


        cy.editClient(1, "2020-01-05T12:00:00.000Z", "Herr Gurka", "long@giant.com", "1111 2222 3333")
            .then((response => {
                expect(response.status).to.eq(200)

            }))

        // Check the edited client (ID 1)
        cy.getClient(1).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body))
        })


    })
    it("TCO7 - Create new bill", () => {

        // Get the bills list
        cy.getBills().then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body))
        });

        //Create a bill request
        cy.createNewBill("", "", 500, false)
            .then((response => {
                expect(response.status).to.eq(200)
            }))

        // the check last created bill
        cy.getBills().then((response) => {
            expect(response.status).to.eq(200);
            let lastID = response.body[response.body.length - 1].id
            cy.log(lastID)

            cy.getBill(lastID).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            }))

            //list of bills
            cy.getBills().then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body))
            });

            // Delete the created bill
            cy.deleteBill(lastID).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            }))
        })

        // Get the bills list (to confirm the created client as been deleted)
        cy.getBills().then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body))
        });

    })

    it("TCO8 - edit a bill", () => {

        //Create a bill request
        cy.createNewBill("", "", 10500, false).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
        }))

        // the check last created bill
        cy.getBills().then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body))
            let lastID = response.body[response.body.length - 1].id
            cy.log(lastID)
            
            // edit the last bill
            cy.editBill(lastID, "2020-01-05T12:00:00.000Z", 10500, true).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))

            }))

        })
        
        cy.getBills().then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body))
        })
    })
})
