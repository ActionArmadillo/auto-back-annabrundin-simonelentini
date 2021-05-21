//import "cypress-localstorage-commands";
Cypress.Commands.add('login', () => {
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
        body: USER_CREDENTIALS
    }).then((response => {
        expect(response.status).to.eq(200)
        Cypress.env({ loginToken: response.body })
        cy.log(response.body)
    }))
})

Cypress.Commands.add('logout', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/logout',
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response => {
        expect(response.status).to.eq(200)
    }))
})