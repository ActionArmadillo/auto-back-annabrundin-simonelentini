/// <reference types = "cypress" />

// reservations and reservation api functionality

const NEW_RESERVATION_URL = 'http://localhost:3000/api/reservation/new';
const RESERVATIONS_URL = 'http://localhost:3000/api/reservations';
const RESERVATION_URL = 'http://localhost:3000/api/reservation/';


//Cypress.Commands.add('createNewReservation', (id, created, start, end, client, room, bill) => {
Cypress.Commands.add('createNewReservation', (reservationBody) => {
    cy.request({
        method: 'POST',
        url: NEW_RESERVATION_URL,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body: reservationBody
        /*{

            "id": id,
            "created": created,
            "start": start,
            "end": end,
            "client": client,
            "room": room,
            "bill": bill
        }*/
    })
})

Cypress.Commands.add('getReservations', () => {
    cy.log(JSON.stringify(Cypress.env().loginToken))
    cy.request({
        method: 'GET',
        url: RESERVATIONS_URL,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
    })
})

Cypress.Commands.add('getReservation', (reservationId) => {
    cy.log(JSON.stringify(Cypress.env().loginToken))
    cy.request({
        method: 'GET',
        url: RESERVATION_URL + reservationId,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
    })
})

Cypress.Commands.add('editReservation', (reservationID, body) => {
    cy.request({
        method: 'PUT',
        url: RESERVATION_URL + reservationID,

        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body: body/*{

            "id": id,

            "created": created,
            "start": start,
            "end": end,
            "client": client,
            "room": room,
            "bill": bill
        }*/
    })
})

Cypress.Commands.add('deleteReservation', (reservationId) => {
    cy.log(JSON.stringify(Cypress.env().loginToken))
    cy.request({
        method: 'DELETE',
        url: RESERVATION_URL + reservationId,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
    })
})

