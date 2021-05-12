/// <reference types="cypress" />


//////////////
// elements //
//////////////

const CREATE_RESERVATION_BUTTON = 'h2 > .btn'
const RESERVATIONS_LIST = '.reservations'
const MEATBALLS_BUTTON = '.action'
const DELETE_BUTTON = '.menu > :nth-child(2)'

//////////////////////////////////
// functions / methods / actions//
//////////////////////////////////


function openCreateReservationPage(){
    cy.get(CREATE_RESERVATION_BUTTON).click()
}

function validateReservation(client, start_date, end_date){
    cy.get(RESERVATIONS_LIST).last()
    .should('contain', client)
    .and('contain', start_date)
    .and('contain', end_date)

}

function removeReservation(){
    cy.get(MEATBALLS_BUTTON).last().click()
    cy.get(DELETE_BUTTON).click()
}

//////////////////////
// export functions //
//////////////////////
module.exports = {
    openCreateReservationPage,
    validateReservation,
    removeReservation
}