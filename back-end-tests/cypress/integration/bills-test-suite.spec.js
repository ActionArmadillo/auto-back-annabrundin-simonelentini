/// <reference types = "cypress" />


//-----------------------------------------------------------------//
//                          variables                              //
//-----------------------------------------------------------------//


//-----------------------------------------------------------------//
//                          test cases                             //
//-----------------------------------------------------------------//

describe('Test suite for the backend tests of Hotel site (Bills)', () => {
    beforeEach(() => {
        cy.login()
    })

    afterEach(() => {
        cy.logout()
    });

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
                expect(response.body.value).to.eq(500)
                expect(response.body.paid).to.be.false
                cy.log(JSON.stringify(response.body))
            }))

            //list of bills
            cy.getBills().then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body))
            })
        })
    })

    it("TCO8 - Edit a bill and delete", () => {


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

            // check the last bill
            cy.getBill(lastID).then((response) => {
                expect(response.status).to.eq(200);
               expect(response.body.created).to.eq("2020-01-05T12:00:00.000Z")
                expect(response.body.value).to.eq(10500)
                expect(response.body.paid).to.be.true
                cy.log(JSON.stringify(response.body))
            })

            // Delete the created bill
            cy.deleteBill(lastID).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            }))
           
            // Get the bills list (to confirm the created client as been deleted)
            cy.getBills().then((response) => {
                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body))
            });
        })
    })
})
