/// <reference types='Cypress'/>

describe('description', () => {

    
    before(() => {
        cy.fixture('carrito').then((datos) => {
            globalThis.datos = datos
        })
    });
    
    
    beforeEach(() => {
        cy.visit('https://demo.opencart.com/index.php?route=common/home');
    });
    
    it('Agregar elemento al carrito', () => {
       
        // cy.get('.product-thumb').contains('HTC Touch HD').parent().find('button[onclick^="cart.add"]').click()
        // cy.get('.product-thumb').contains('HTC Touch HD').parent().parent().parent().find('button[onclick^="cart.add"]').click()
        cy.get('.product-thumb').contains('HTC Touch HD').parentsUntil('.product-thumb').find('button[onclick^="cart.add"]').click()
        cy.get('.alert').should('have.class','alert-success').should('contain.text',` Success: You have added HTC Touch HD to your shopping cart!`)
    });

    it.only('custom command', () => {
        cy.get('#menu').contains('Phones & PDAs').click()
        cy.agregarElementoAlCarrito(datos.telefono1)
        cy.agregarElementoAlCarrito(datos.telefono2)
        cy.agregarElementoAlCarrito(datos.telefono3)
        cy.get('.btn-inverse').click()  
        cy.verificarCarrito(datos.telefono1)
        cy.verificarCarrito(datos.telefono2)
        cy.verificarCarrito(datos.telefono3)
    });
});