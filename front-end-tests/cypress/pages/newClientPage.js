/// <reference types="cypress" />

/////////////
// elements//
/////////////
const NAME_TEXTFIELD = ':nth-child(1) > input'
const NAME_FIELD_LABEL = ':nth-child(1) > label'
const EMAIL_TEXTFIELD = ':nth-child(2) > input'
const EMAIL_FIELD_LABEL = ':nth-child(2) > label'
const TELEPHONE_TEXTFIELD = ':nth-child(3) > input'
const TELEPHONE_FILED_LABEL = ':nth-child(3) > label'
const SAVE_BUTTON = '.blue'


//////////////////////////////////
// functions / methods / actions//
//////////////////////////////////

// view and validate New Client page
function validateNewClientPage(){
    cy.contains('New Client')
    cy.get(NAME_FIELD_LABEL).should('have.text','Name').should('have.css', 'text-transform', 'uppercase')
    cy.get(EMAIL_FIELD_LABEL).should('have.text','Email').should('have.css', 'text-transform', 'uppercase')
    cy.get(TELEPHONE_FILED_LABEL).should('have.text','Telephone').should('have.css', 'text-transform', 'uppercase')
    cy.get('.blue').should('have.text', 'Save')
}

function createNewClient(name, email, telephone){
    cy.get(NAME_TEXTFIELD).type(name)
    cy.get(EMAIL_TEXTFIELD).type(email)
    cy.get(TELEPHONE_TEXTFIELD).type(telephone)
    cy.get(SAVE_BUTTON).click()
}

/////////////////////
// export functions//
/////////////////////
module.exports = {
    validateNewClientPage,
    createNewClient
}