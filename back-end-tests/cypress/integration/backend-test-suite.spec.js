/// <reference types = "cypress" />

describe('Test suite for the backend tests of Hotel site', () => {
    it('TC01 - Login to the application', () => {
        //cy.login()
        const USER_CREDENTIALS = {
            "username": "tester01",
            "password": "GteteqbQQgSr88SwNExUQv2ydb7xuf8c"
        }

        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/login',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(USER_CREDENTIALS)
        }).then((response => {
            expect(response.status).to.eq(200)
            Cypress.env({ loginToken: response.body })
            cy.log(response.body)
        }))
    })
})