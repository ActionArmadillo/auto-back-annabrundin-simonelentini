/// <reference types="cypress" />

//////////////
// elements //
//////////////
const VIEW_ROOMS_PAGE_BUTTON = ':nth-child(1) > .btn'
const VIEW_CLIENTS_PAGE_BUTTON = '.blocks > :nth-child(2) > .btn'
const VIEW_BILLS_PAGE_BUTTON = ':nth-child(3) > .btn'
const VIEW_RESERVATIONS_BUTTON = ':nth-child(4) > .btn'
const HEADER = "h2 > div"
//////////////////////////////////
// functions / methods / actions//
//////////////////////////////////

function openRoomsPage(content){
    cy.get(VIEW_ROOMS_PAGE_BUTTON).click()
    cy.get(HEADER).should("contain", content)
}

function openClientsPage(){
    cy.get(VIEW_CLIENTS_PAGE_BUTTON).click()
}

function openBillsPage(){
    cy.get(VIEW_BILLS_PAGE_BUTTON).click()
}

function openReservationsPage(){
    cy.get(VIEW_RESERVATIONS_BUTTON).click()
}

/////////////////////
// export functions//
/////////////////////
module.exports = {
    openRoomsPage,
    openClientsPage,
    openBillsPage,
    openReservationsPage
}