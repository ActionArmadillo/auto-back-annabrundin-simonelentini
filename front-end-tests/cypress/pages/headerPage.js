/// <reference types="cypress" />

// elements
const HEADER_TITLE = 'h1 > .router-link-active'
const HEADER_NAME = 'h1'
const WELCOME_MESSAGE = '.username'
const LOGOUT_BUTTON = '.user > .btn'
const PAGES = [ 'http://localhost:3000/rooms',
                'http://localhost:3000/clients',
                'http://localhost:3000/bills',
                'http://localhost:3000/reservations',
                'http://localhost:3000/room/new',
                'http://localhost:3000/client/new',
                'http://localhost:3000/bill/new',
                'http://localhost:3000/reservation/new'
             ]

// functions / methods / actions
function checkElements(username){
    cy.get(HEADER_NAME).should('contain', 'Tester Hotel')
    cy.get(WELCOME_MESSAGE).should('contain', username)
    cy.get(LOGOUT_BUTTON).contains('Logout')
}

function checkPages(username){
    for(var i = 0; i < PAGES.length; i++){
        cy.log('checking')
        cy.visit(PAGES[i])
        checkElements(username)
        cy.get(HEADER_TITLE).click()
    }
}

function performLogout(){
    cy.get(LOGOUT_BUTTON).contains('Logout')   
    cy.get(LOGOUT_BUTTON).click()
}

function backToIndex(){
    cy.get(HEADER_TITLE).click()
}

// export functions
module.exports = {
    checkElements,
    checkPages,
    backToIndex,
    performLogout
}