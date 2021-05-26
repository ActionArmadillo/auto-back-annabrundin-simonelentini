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

    it("TCO - Create new client", () => {
        client.createClient()
    })

    it("TCO - Edit a client", () => {
        client.editLastClient()
    })

    it("TCO - Delete a client", () => {
        client.deleteLastClient()
    })
})
