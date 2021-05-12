/// <reference types="cypress" />

const CREATE_CLIENT_BTN = "h2 > .btn"
const CLIENT_LIST = ".clients"
const DROP_DOWN_BTN = ".action > img"
const EDIT_BTN = ".menu > :nth-child(1)"
const HEADER = "h2 > div"

const EDIT_NAME_FIELD = ":nth-child(3) > input"
const EDIT_EMAIL_FIELD = ":nth-child(4) > input"
const EDIT_PHONE_FIELD = ":nth-child(5) > input"
const SAVE_BTN = '.blue'

/*
function editClient(name, mail, number) {
    cy.get(EDIT_NAME_FIELD).clear().type(name)
    cy.get(EDIT_PHONE_FIELD).clear().type(number)
    cy.get(EDIT_EMAIL_FIELD).clear().type(mail)
    cy.get(SAVE_BTN).click()

}
*/

function editClient(name, mail, number, content) {
      cy.get(DROP_DOWN_BTN).last().click()
      cy.get(EDIT_BTN).click()
      cy.get(EDIT_NAME_FIELD).clear()
      cy.get(EDIT_EMAIL_FIELD).clear()
      cy.get(EDIT_PHONE_FIELD).clear()
  
      cy.get(EDIT_NAME_FIELD).type(name)
      cy.get(EDIT_EMAIL_FIELD).type(mail)
      cy.get(EDIT_PHONE_FIELD).type(number)
      cy.get(SAVE_BTN).click()
      cy.get(HEADER).should("contain", content) //Client: 2
  }
  


exports.default = {
    editClient

}