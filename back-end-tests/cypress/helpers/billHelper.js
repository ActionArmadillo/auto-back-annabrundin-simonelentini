const faker = require('faker')

function createBillBody() {
    let billBody = {
        "id": "",
        "created": "",
        "value": faker.datatype.number({ min: 1000, max: 10000 }),
        "paid": true
    }
    return billBody
}

function createBill() {
    var bill = createBillBody()
    cy.createNewBill(bill).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))

    cy.getBills().then((response => {
        expect(response.status).to.eq(200)
        let lastBillID = response.body[response.body.length - 1].id
        var billData = response.body[lastBillID - 1]

        expect(billData.id).is.greaterThan(1)
        expect(billData.created).is.not.empty
        expect(billData.value).to.eq(bill.value)
        expect(billData.paid).to.be.true
       
    }))
}

function editLastBill() {
    let billBody = {}
    cy.getBills().then((response => {
        let lastBillID = response.body[response.body.length - 1].id
        let created = response.body[lastBillID - 1].created
        let value = faker.datatype.number({ min: 1000, max: 10000 })
        billBody = {
            "id": lastBillID,
            "created": created,
            "value": value,
            "paid": false
        }
        cy.editBill(lastBillID, billBody).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
        }))
    }))

    cy.getBills().then((response => {
        expect(response.status).to.eq(200)
        let lastBillID = response.body[response.body.length - 1].id
        var billData = response.body[lastBillID - 1]

        expect(billData.created).is.not.empty
        expect(billData.value).to.eq(billBody.value)
        expect(billData.paid).to.be.false
       
    }))
}

function deleteLastBill() {
    cy.getBills().then((response => {
        expect(response.status).to.eq(200)
    })).then((response => {
        let lastBillID = response.body[response.body.length - 1].id
        cy.deleteBill(lastBillID).then((response => {
            expect(response.status).to.eq(200)
        }))

        cy.getBills().then((response => {
            expect(response.status).to.eq(200)
            let lastBillID = response.body[response.body.length - 1].id
            var billData = response.body[lastBillID - 1]
            expect(billData.id).to.be.lessThan(2)
        }))
    }))
}

module.exports = {
    createBill,
    editLastBill,
    deleteLastBill
}