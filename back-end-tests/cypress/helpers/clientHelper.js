const faker = require('faker')

function createClientBody() {
    let clientBody = {
        "id": "",
        "created": "",
        "name": name,
        "email": email,
        "telephone": telephone
    }
    return clientBody
}

function createClient() {
    var client = createClientBody()
    cy.createNewBill(client).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))

    cy.getClients().then((response => {
        expect(response.status).to.eq(200)
        let lastClientID = response.body[response.body.length - 1].id
        var clientData = response.body[lastClientID - 1]

        expect(clientData.id).is.greaterThan(1)
        expect(clientData.created).is.not.empty
        expect(clientData.name).to.eq(client.name)
        expect(clientData.email).to.eq(client.email)
        expect(clientData.telephone).to.eq(client.telephone)


    }))
}

function editLastClient() {
    let clientBody = {}
    cy.getClients().then((response => {
        let lastClientID = response.body[response.body.length - 1].id
        let created = response.body[lastClientID - 1].created
        let name = faker.datatype.number({ min: 1000, max: 10000 })
        let email = faker.datatype.number({ min: 1000, max: 10000 })
        let telephone = faker.datatype.number({ min: 1000, max: 10000 })
        clientBody = {
            "id": lastClientID,
            "created": created,
            "name": name,
            "email": email,
            "telephone": telephone
        }
        cy.editClient(lastClientID, clientBody).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
        }))
    }))

    cy.getClients().then((response => {
        expect(response.status).to.eq(200)
        let lastClientID = response.body[response.body.length - 1].id
        var clientData = response.body[lastClientID - 1]

        expect(clientData.created).is.not.empty
        expect(clientData.name).to.eq(clientBody.name)
        expect(clientData.email).to.eq(clientBody.email)
        expect(clientData.telephone).to.eq(clientBody.telephone)


    }))
}

function deleteLastClient() {
    cy.getClients().then((response => {
        expect(response.status).to.eq(200)
    })).then((response => {
        let lastClientID = response.body[response.body.length - 1].id
        cy.deleteClient(lastClientID).then((response => {
            expect(response.status).to.eq(200)
        }))

        cy.getClients().then((response => {
            expect(response.status).to.eq(200)
            let lastClientID = response.body[response.body.length - 1].id
            var clientData = response.body[lastClientID - 1]
            expect(clientData.id).to.be.lessThan(2)
        }))
    }))
}

module.exports = {
    createClient,
    editLastClient,
    deleteLastClient
}