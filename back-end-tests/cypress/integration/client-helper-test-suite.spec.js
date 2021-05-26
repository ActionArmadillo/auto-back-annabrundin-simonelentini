/// <reference types = "cypress" />
import * as client from '../helpers/clientHelper'

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

    it("TCO - Create new client and validate the result", () => {
        client.createClient()
    })

    it("TCO - Edit a client and validate the result", () => {
        client.editLastClient()
    })

    it("TCO - Delete a client and validate the result", () => {
        client.deleteLastClient()
    })
})
