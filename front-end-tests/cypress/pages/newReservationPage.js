/// <reference types="cypress" />


//////////////
// elements //
//////////////
const START_TEXT_FIELD = ':nth-child(1) > input'
const END_TEXT_FIELD = ':nth-child(2) > input'
const CLIENT_SELECT = ':nth-child(3) > select'
const ROOM_SELECT = ':nth-child(4) > select'
const BILL_SELECT = ':nth-child(5) > select'
const SAVE_BUTTON = '.blue'

//////////////////////////////////
// functions / methods / actions//
//////////////////////////////////

function createReservation(start_date, end_date){
    cy.get(START_TEXT_FIELD).type(start_date)
    cy.get(END_TEXT_FIELD).type(end_date)
    cy.get(CLIENT_SELECT).select('3')//find('select').contains(client)
    cy.get(ROOM_SELECT).select('3')
    cy.get(BILL_SELECT).select('2')
    cy.get(SAVE_BUTTON).click()
}
//////////////////////
// export functions //
//////////////////////
module.exports = {
    createReservation
}