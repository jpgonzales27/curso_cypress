/// <reference types='Cypress'/>

describe('description', () => {

    it('INTERCEPTAR UN GET', () => {
        cy.visit('https://example.cypress.io/commands/network-requests')
        //Escuchat las peticiones GET a comments/1
        cy.intercept('GET', '**/comments/*').as('getComment')

        // tenemos un código que recibe un comentario cuando
        // se hace clic en el botón en scripts.js
        cy.get('.network-btn').click()

        //https://on.cypress.io
        // cy.wait('@getComment').its('response.statusCode').should('eq',200)
        cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200, 304])
    });

    it('INTERCEPTAR UN POST', () => {
        cy.visit('https://example.cypress.io/commands/network-requests')
        //Escuchat las peticiones POST a comments
        cy.intercept('POST', '**/comments').as('postComment')

        // tenemos un código que publica un comentario cuando
        // se hace clic en el botón en scripts.js
        cy.get('.network-post').click()

        //https://on.cypress.io
        // cy.wait('@postComment').its('response.statusCode').should('eq',200)
        cy.wait('@postComment').should(({ request, response }) => {
            expect(request.body).to.include('email')
            expect(request.headers).to.have.property('content-type')
            expect(response && response.body).to.have.property('name', 'Using POST in cy.intercept()')
        })
    });

    it.only('INTERCEPTAR Y MODIFICAR UN REQUEST PUT', () => {

        let message = 'Mensaje de error que creamos nosotros'

        cy.visit('https://example.cypress.io/commands/network-requests')

        // Intercerptar y modificar la respuesta de PUT comments/*

        //estamos mockeando el request cy.intercept({request}{body mock})
        cy.intercept({
            method: 'PUT',
            url: '**/comments/*',
        }, {
            statusCode: 404,
            body: { error: message },
            headers: { 'access-control-allow-origin': '*' },
            delayMs: 500,
        }).as('putComment')

        // tenemos código que pone un comentario cuando
        // se hace clic en el botón en scripts.js
        cy.get('.network-put').click()

        cy.wait('@putComment')

        // aplicamos la validacion sobre nuesto mensaje mokeado
        cy.get('.network-put-comment').should('contain', message)
    })
});