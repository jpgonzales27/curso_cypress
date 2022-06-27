/// <reference types='Cypress'/>

describe('description', () => {

    
    before(() => {
        cy.fixture('articulos').then((datos) => {
            globalThis.datos = datos
        })
    });
    
    
    beforeEach(() => {
        cy.visit('https://demo.opencart.com/index.php?route=common/home');
    });
    

    it.only('Iterar array en un json', () => {
        cy.get('#menu').contains('Phones & PDAs').click()

        datos.articulos.forEach( e => {
            cy.agregarElementoAlCarrito(e)
        })
        cy.get('.btn-inverse').click()  

        datos.articulos.forEach( e => {
            cy.verificarCarrito(e)
        })
    });
});