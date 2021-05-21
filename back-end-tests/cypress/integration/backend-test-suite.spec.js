/// <reference types = "cypress" />


//-----------------------------------------------------------------//
//                          variables                              //
//-----------------------------------------------------------------//


//-----------------------------------------------------------------//
//                          test cases                             //
//-----------------------------------------------------------------//

describe('Test suite for the backend tests of Hotel site', () => {
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
        cy.createNewRoom("", "", "double", 44441, 133, true, 440, ["balcony", "ensuite"]).then((response => {
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

            cy.log(JSON.stringify(response.body))

            cy.editRoom(lastID, created, "double", 5, 555, true, 1024, ["ensuite", "sea_view"]).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body[2]))
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

        cy.getRooms().then((response => {
            expect(response.status).to.eq(200)
            expect(response.body[response.body.length - 1].id).to.be.lessThan(3)
        }))
    })
  
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
    it("TCO7 - Create new bill and delete", () => {

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
