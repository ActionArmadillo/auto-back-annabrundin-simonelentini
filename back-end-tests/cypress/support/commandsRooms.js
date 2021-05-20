/// <reference types = "cypress" />
// Rooms and room api functionality


const NEW_ROOM_URL = 'http://localhost:3000/api/room/new';
const ROOMS_URL = 'http://localhost:3000/api/rooms';
const ROOM_URL = 'http://localhost:3000/api/room/';

Cypress.Commands.add('createNewRoom', (id, created, category, floor, number, available, price, features) => {
    cy.request({
        method: 'POST',
        url: NEW_ROOM_URL,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body: {
            "id": id,
            "created": created,
            "category": category,
            "floor": floor,
            "number": number,
            "available": available,
            "price": price,
            "features": features
        }
    })
})

Cypress.Commands.add('getRooms', () => {
    cy.log(JSON.stringify(Cypress.env().loginToken))
    cy.request({
        method: 'GET',
        url: ROOMS_URL,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
    })
})

Cypress.Commands.add('getRoom', (roomID) => {
    cy.log(JSON.stringify(Cypress.env().loginToken))
    cy.request({
        method: 'GET',
        url: ROOM_URL + roomID,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
    })
})

Cypress.Commands.add('editRoom', (roomID, created, category, floor, number, available, price, features) => {
    cy.request({
        method: 'PUT',
        url: ROOM_URL + roomID,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body: {
            "id": roomID,
            "created": created,
            "category": category,
            "floor": floor,
            "number": number,
            "available": available,
            "price": price,
            "features": features
        }
    })
})

Cypress.Commands.add('deleteRoom', (roomID) => {
    cy.log(JSON.stringify(Cypress.env().loginToken))
    cy.request({
        method: 'DELETE',
        url: ROOM_URL + roomID,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
    })
})
