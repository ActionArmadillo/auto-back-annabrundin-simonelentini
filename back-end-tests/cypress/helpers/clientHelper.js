const faker = require('faker')

function createClientBody() {
    let clientBody = {
        "id": "",
        "created": "",
        "name": faker.name.findName(),
        "email": faker.internet.email(),
        "telephone": faker.phone.phoneNumber()
    }
    return clientBody
}

function createClient() {
    var client = createClientBody()
    cy.createNewClient(client).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))

    cy.getClients().then((response => {
        expect(response.status).to.eq(200)
        let lastClientID = response.body[response.body.length - 1].id
        var clientData = response.body[lastClientID - 1]

        expect(clientData.id).is.greaterThan(0)
        expect(clientData.created).is.not.empty
        expect(clientData.name).to.eq(clientData.name)
        expect(clientData.email).to.eq(clientData.email)
        expect(clientData.telephone).to.eq(clientData.telephone)


    }))
}

function editLastClient() {
    let clientBody = {}
    cy.getClients().then((response => {
        let lastClientID = response.body[response.body.length - 1].id
        let created = response.body[lastClientID - 1].created
        let name = faker.name.findName()
        let email = faker.internet.email()
        let telephone =  faker.phone.phoneNumber()
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
            expect(clientData.id).to.be.lessThan(3)
        }))
    }))
}

module.exports = {
    createClient,
    editLastClient,
    deleteLastClient
}