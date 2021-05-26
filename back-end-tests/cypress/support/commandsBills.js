/// <reference types = "cypress" />

const NEW_BILLS_URL = 'http://localhost:3000/api/bill/new';
const BILLS_URL = "http://localhost:3000/api/bills";
const BILL_URL = 'http://localhost:3000/api/bill/';

//Cypress.Commands.add('createNewBill', (id, created, value, paid) => {
Cypress.Commands.add('createNewBill', (billBody) => {
    cy.request({
        method: 'POST',
        url: NEW_BILLS_URL,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body: billBody /*{
            "id": id,
            "created": created,
            "value": value,
            "paid": paid
        }*/
    })
})

Cypress.Commands.add('getBills', () => {
    cy.log(JSON.stringify(Cypress.env().loginToken))
    cy.request({
        method: 'GET',
        url: BILLS_URL,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
    })
})

Cypress.Commands.add('getBill', (billID) => {
    cy.log(JSON.stringify(Cypress.env().loginToken))
    cy.request({
        method: 'GET',
        url: BILL_URL + billID,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
    })
})

//Cypress.Commands.add('editBill', (id, created, value, paid) => {
Cypress.Commands.add('editBill', (billID, billBody) => {
    cy.request({
        method: 'PUT',
        url: BILL_URL + billID,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body: billBody /*{
            "id": id,
            "created": created,
            "value": value,
            "paid": paid
        }*/
    })
})

Cypress.Commands.add('deleteBill', (billID) => {
    cy.log(JSON.stringify(Cypress.env().loginToken))
    cy.request({
        method: 'DELETE',
        url: BILL_URL + billID,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
    })
})
