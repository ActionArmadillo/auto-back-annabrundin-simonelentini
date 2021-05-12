/// <reference types="cypress" />

//////////////
// elements //
//////////////

const CREATE_ROOM_BUTTON = 'h2 > .btn'
const ROOMS_LIST = '.rooms'
const MEATBALLS_BUTTON = '.action'
const DELETE_BUTTON = '.menu > :nth-child(2)'

//////////////////////////////////
// functions / methods / actions//
//////////////////////////////////

function openNewRoomPage(){
    cy.get(CREATE_ROOM_BUTTON).click()
}

function validateAvailableRoom(category, number, floor, available, features){
   
    cy.get(ROOMS_LIST).last()
        .should('contain', category)
        .and('contain', number)
        .and('contain', floor)
        .and('contain', available)
        .and('contain', features)
}

function removeLastRoom(){
    cy.get(MEATBALLS_BUTTON).last().click()
    cy.get(DELETE_BUTTON).click()
}

//////////////////////
// export functions //
//////////////////////
module.exports = {
    openNewRoomPage,
    validateAvailableRoom,
    removeLastRoom
}