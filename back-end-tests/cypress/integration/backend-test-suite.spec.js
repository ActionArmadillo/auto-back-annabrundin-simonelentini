/// <reference types = "cypress" />

describe('Test suite for the backend tests of Hotel site', () => {
    it('Request to /api/login', () => {
        cy.login()
    })
})


