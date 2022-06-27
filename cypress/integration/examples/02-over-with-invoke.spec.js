/// <reference types='Cypress'/>

describe('flotando sobre elementos', () => {

    beforeEach(() => {
        cy.visit("http://automationpractice.com/index.php");
      });
    it('verificar que el dropdown de women tenga los elementos necesarios', () => {
        cy.get('#block_top_menu > ul > li:nth-child(1) > ul').invoke('attr','style','display:block')
        cy.get('a[title="Tops"]').should('be.visible')
        cy.get('a[title="T-shirts"]').should('be.visible')
        cy.get('a[title="Blouses"]').should('be.visible')
        cy.get('a[title="Dresses"]').should('be.visible')
        cy.get('a[title^="Casual"]').should('be.visible')
        cy.get('a[title^="Evening"]').should('be.visible')
        cy.get('a[title^="Summer"]').should('be.visible')
    });
});