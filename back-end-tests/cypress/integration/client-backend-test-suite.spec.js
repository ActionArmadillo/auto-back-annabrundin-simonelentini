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

    it("TCO5 - Create new client", () => {
        client.createClient()
    })

    it("TCO6 - Edit and delete the last client", () => {
        client.editLastClient()
        client.deleteLastClient()
    })

   
})
