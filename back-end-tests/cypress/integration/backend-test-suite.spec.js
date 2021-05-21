/// <reference types = "cypress" />

describe("Test suite for the backend tests of Hotel site", () => {

    beforeEach(() => {
        cy.login()
    });

    afterEach(() => {
        cy.logout()
    });

    /*  it("TC01 - Login to the application", () => {
          //cy.login()
          const USER_CREDENTIALS = {
              username: "tester01",
              password: "GteteqbQQgSr88SwNExUQv2ydb7xuf8c",
          };
  
          cy.request({
              method: "POST",
              url: "http://localhost:3000/api/login",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(USER_CREDENTIALS),
          }).then((response) => {
              expect(response.status).to.eq(200);
              Cypress.env({ loginToken: response.body });
              cy.log(response.body);
          });
      });
  */
    it("TC02 - GET Rooms list", () => {

        cy.request({
            method: "GET",
            url: "http://localhost:3000/api/rooms",
            headers: {
                "X-User-Auth": JSON.stringify(Cypress.env().loginToken),
                "Content-Type": "application/json",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body))
        });
    });

    it.only("TCO5 - Create new client", () => {

        // Get the clients list
        cy.getClients().then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body))
            });

        //Create a client request
        cy.request({
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
            }
        }).then((response => {
            expect(response.status).to.eq(200)
        }))

        // the check last created client
        cy.request({
            method: "GET",
            url: "http://localhost:3000/api/clients",
            headers: {
                "X-User-Auth": JSON.stringify(Cypress.env().loginToken),
                "Content-Type": "application/json",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            let lastID = response.body[response.body.length - 1].id
            cy.log(lastID)

            cy.request({
                method: 'GET',
                url: 'http://localhost:3000/api/client/' + lastID,
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            }))

            //list of clients
            cy.request({
                method: "GET",
                url: "http://localhost:3000/api/clients",
                headers: {
                    "X-User-Auth": JSON.stringify(Cypress.env().loginToken),
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body))
            });

            // Delete the created client
            cy.request({
                method: 'DELETE',
                url: 'http://localhost:3000/api/client/' + lastID,
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            }))
        })

        // Get the clients list (confirm the created client as been deleted)
        cy.request({
            method: "GET",
            url: "http://localhost:3000/api/clients",
            headers: {
                "X-User-Auth": JSON.stringify(Cypress.env().loginToken),
                "Content-Type": "application/json",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body))
        });

    })

    it("TCO6 - Edit client", () => {

        // Get the client ID 1
        cy.request({
            method: "GET",
            url: "http://localhost:3000/api/client/1",
            headers: {
                "X-User-Auth": JSON.stringify(Cypress.env().loginToken),
                "Content-Type": "application/json",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body))
        });


        //Edit the client ID 1
        cy.request({
            method: 'Put',
            url: 'http://localhost:3000/api/client/1',
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: {
                "id": 1,
                "created": "2020-01-05T12:00:00.000Z",
                "name": "Herr Gurka",
                "email": "long@giant.com",
                "telephone": "1111 2222 3333"
            }
        }).then((response => {
            expect(response.status).to.eq(200)

        }))

        // Check the edited client (ID 1)
        cy.request({
            method: "GET",
            url: "http://localhost:3000/api/client/1",
            headers: {
                "X-User-Auth": JSON.stringify(Cypress.env().loginToken),
                "Content-Type": "application/json",
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body))
        })


    })
    it("TCO7 - Create new bill", () => {

        // Get the bills list
        cy.request({
            method: "GET",
            url: "http://localhost:3000/api/bills",
            headers: {
                "X-User-Auth": JSON.stringify(Cypress.env().loginToken),
                "Content-Type": "application/json",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body))
        });

        //Create a bill request
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/bill/new',
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: {
                "id": "",
                "created": "",
                "value": 500,
                "paid": false
            }
        }).then((response => {
            expect(response.status).to.eq(200)
        }))

        // the check last created bill
        cy.request({
            method: "GET",
            url: "http://localhost:3000/api/bills",
            headers: {
                "X-User-Auth": JSON.stringify(Cypress.env().loginToken),
                "Content-Type": "application/json",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            let lastID = response.body[response.body.length - 1].id
            cy.log(lastID)

            cy.request({
                method: 'GET',
                url: 'http://localhost:3000/api/bill/' + lastID,
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            }))

            //list of bills
            cy.request({
                method: "GET",
                url: "http://localhost:3000/api/bills",
                headers: {
                    "X-User-Auth": JSON.stringify(Cypress.env().loginToken),
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body))
            });

            // Delete the created bill
            cy.request({
                method: 'DELETE',
                url: 'http://localhost:3000/api/bill/' + lastID,
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            }))
        })

        // Get the bills list (to confirm the created client as been deleted)
        cy.request({
            method: "GET",
            url: "http://localhost:3000/api/bills",
            headers: {
                "X-User-Auth": JSON.stringify(Cypress.env().loginToken),
                "Content-Type": "application/json",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body))
        });

    })

    it("TCO8 - edit a bill", () => {

        //Create a bill request
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/bill/new',
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: {
                "id": "",
                "created": "",
                "value": 10500,
                "paid": false
            }
        }).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
        }))

        // the check last created bill
        cy.request({
            method: "GET",
            url: "http://localhost:3000/api/bills",
            headers: {
                "X-User-Auth": JSON.stringify(Cypress.env().loginToken),
                "Content-Type": "application/json",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body))

            // edit the bill id 2
            cy.request({
                method: 'Put',
                url: 'http://localhost:3000/api/bill/2',
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body: {
                    "id": 2,
                    "created": "2020-01-05T12:00:00.000Z",
                    "value": 10500,
                    "paid": true
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))

            }))

        })

        // Get the bills list 
        cy.request({
            method: "GET",
            url: "http://localhost:3000/api/bills",
            headers: {
                "X-User-Auth": JSON.stringify(Cypress.env().loginToken),
                "Content-Type": "application/json",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body))
        });

    })
})