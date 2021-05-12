/// <reference types="cypress" />


// login page elements
const HEADER_TITLE = '.router-link-active'
const USERNAME_TEXTFIELD = ':nth-child(1) > input'
const USERNAME_LABEL = ':nth-child(1) > label'
const PASSWORD_TEXTFIELD = ':nth-child(2) > input'
const PASSWORD_LABEL = ':nth-child(2) > label'
const LOGIN_BUTTON = '.btn'
const MAIN_PAGE_TITLE = 'h2'

// actions / methods / functions
function checkElements(){
    cy.get(HEADER_TITLE).contains('Tester Hotel')
    cy.get(USERNAME_LABEL).should('have.text','Username:').should('have.css', 'text-transform', 'uppercase')
    cy.get(PASSWORD_LABEL).should('have.text','Password:').should('have.css', 'text-transform', 'uppercase')
}

function validLogin(username, password, content){
    cy.get(USERNAME_TEXTFIELD).type(username)
    cy.get(PASSWORD_TEXTFIELD).type(password)
    cy.get(LOGIN_BUTTON).click()    
    cy.get(MAIN_PAGE_TITLE).should('have.text', content)
}

function login(username, password){
    cy.get(USERNAME_TEXTFIELD).type(username)
    cy.get(PASSWORD_TEXTFIELD).type(password)
    cy.get(LOGIN_BUTTON).click()
}

// export functions
module.exports = {
    checkElements,
    validLogin,
    login
}
