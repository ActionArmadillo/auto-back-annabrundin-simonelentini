/// <reference types="cypress" />

//////////////
// elements //
//////////////
const CREATE_BILL_BUTTON = 'h2 > .btn'
const BILLS_LIST = '.bills'
const MEATBALLS_BUTTON = '.action'
const EDIT_BTN = '.menu > :nth-child(1)'
const DELETE_BUTTON = '.menu > :nth-child(2)'


//////////////////////////////////
// functions / methods / actions//
//////////////////////////////////

function openNewBillPage(){
    cy.get(CREATE_BILL_BUTTON).click()
}

function validateUnpaidBill(value, paid){
    cy.get(BILLS_LIST).should('contain', value).and('contain', paid)
}

function validatePaidBill(value, paid){
    cy.get(BILLS_LIST).should('contain', value).and('contain', paid)
}

function removeLastBill(){
    cy.get(MEATBALLS_BUTTON).last().click()
    cy.get(DELETE_BUTTON).click()
}

function openEditLastBill() {
    cy.get(MEATBALLS_BUTTON).last().click()
    cy.get(EDIT_BTN).click()
}

function validateEditedBill(content){
    cy.get(BILLS_LIST).last().should('contain', content)
}

//////////////////////
// export functions //
//////////////////////
module.exports = {
    openNewBillPage,
    openEditLastBill,
    validateUnpaidBill,
    validatePaidBill,
    validateEditedBill,
    removeLastBill
}
 