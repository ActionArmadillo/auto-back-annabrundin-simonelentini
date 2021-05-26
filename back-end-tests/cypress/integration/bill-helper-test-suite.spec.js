/// <reference types = "cypress" />
import * as bill from '../helpers/billHelper'

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

    it("TCO7 - Create new bill and validate the result", () => {
        bill.createBill()
    })

    it("TCO8 - Edit a bill and validate the result", () => {
        bill.editLastBill()
    })

    it("TCO - Delete a bill and validate the result", () => {
        bill.deleteLastBill()
    })
})
