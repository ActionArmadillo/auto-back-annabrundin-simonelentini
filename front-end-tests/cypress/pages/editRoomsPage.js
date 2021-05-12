/// <reference types="cypress" />


//Elements
const CREATE_ROOM_BTN = "h2 > .btn"
const ROOM_LIST = ".room"
const DROP_DOWN_BTN = ".action > img"
const EDIT_BTN = ".menu > :nth-child(1)"
const HEADER = "h2 > div"
const EDIT_CATEGORY_FIELD = ":nth-child(3) > select"
const EDIT_NUMBER_FIELD = ":nth-child(4) > input"
const EDIT_FLOOR_FIELD = ":nth-child(5) > input"
const EDIT_AVAILABLE_CHECK_BOX = ".checkbox"
const EDIT_PRICE_FIELD = ":nth-child(7) > input"
const EDIT_FEATURES_FIELD = ":nth-child(8) > select"
const SAVE_BTN = ".blue"

//Functions

function viewNewRoom(content) {
    cy.get(CREATE_ROOM_BTN).click()
    cy.contains(content)
}

function verifyLastRoom(category, number, floor, price, feature) {


    cy.get(ROOM_LIST).last()
    .should("contain", category)
    .and("contain", number)
    .and("contain", floor)
    .and("be.visible", )
    .and("contain", price)
    .and("contain", feature)
  
    
   

}

function editLastRoom(category, number, floor, price, feature, content) {
 
    cy.get(DROP_DOWN_BTN).last().click()
    cy.get(EDIT_BTN).click()
    cy.get(EDIT_CATEGORY_FIELD).select([category])
    cy.get(EDIT_NUMBER_FIELD).clear().type(number)
    cy.get(EDIT_FLOOR_FIELD).clear().type(floor)
    cy.get(EDIT_AVAILABLE_CHECK_BOX).click()
    cy.get(EDIT_PRICE_FIELD).clear().type(price)
    cy.get(EDIT_FEATURES_FIELD).select(feature)
    cy.get(SAVE_BTN).click()
    cy.get(HEADER).should("contain", content)
    

}



//Exports
exports.default = {
   viewNewRoom,
   verifyLastRoom,
   editLastRoom,
   

}