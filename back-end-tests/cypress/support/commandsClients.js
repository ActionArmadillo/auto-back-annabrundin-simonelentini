/// <reference types = "cypress" />

const NEW_CLIENTS_URL = 'http://localhost:3000/api/client/new';
const CLIENTS_URL = 'http://localhost:3000/api/clients';
const CLIENT_URL = 'http://localhost:3000/api/client/';


Cypress.Commands.add('createNewClient', (clientBody) => {
    cy.request({
        method: 'POST',
        url: NEW_CLIENTS_URL,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body: clientBody
    })
})

Cypress.Commands.add('getClients', () => {
    cy.log(JSON.stringify(Cypress.env().loginToken))
    cy.request({
        method: 'GET',
        url: CLIENTS_URL,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
    })
})

Cypress.Commands.add('getClient', (clientID) => {
    cy.log(JSON.stringify(Cypress.env().loginToken))
    cy.request({
        method: 'GET',
        url: CLIENT_URL + clientID,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
    })
})


Cypress.Commands.add('editClient', (clientID, clientBody) => {
    cy.request({
        method: 'PUT',
        url: CLIENT_URL + clientID,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body: clientBody
    })
})

Cypress.Commands.add('deleteClient', (clientID) => {
    cy.log(JSON.stringify(Cypress.env().loginToken))
    cy.request({
        method: 'DELETE',
        url: CLIENT_URL + clientID,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
    })
})
