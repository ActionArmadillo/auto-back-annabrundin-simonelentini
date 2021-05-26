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

    it("TCO7 - Create new bill ", () => {
        bill.createBill()
    })

    it("TCO8 - Edit and delete the last bill ", () => {
        bill.editLastBill()
        bill.deleteLastBill()
    })

})
