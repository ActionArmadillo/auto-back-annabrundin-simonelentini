/// <reference types="cypress" />

//////////////
// elements //
//////////////
const VALUE_TEXT_FIELD = 'input'
const SAVE_BUTTON = '.blue'
const CHECKBOX = '.checkbox'


//////////////////////////////////
// functions / methods / actions//
//////////////////////////////////

// unpaid //
function createUnpaidBill(value){
    cy.get(VALUE_TEXT_FIELD).type(value)
    cy.get(SAVE_BUTTON).click()
}

// paid //
function createPaidBill(value){
    cy.get(VALUE_TEXT_FIELD).type(value)
    cy.get(CHECKBOX).click()
    cy.get(SAVE_BUTTON).click()
}

//////////////////////
// export functions //
//////////////////////
module.exports = {
    createUnpaidBill,
    createPaidBill,
}
 