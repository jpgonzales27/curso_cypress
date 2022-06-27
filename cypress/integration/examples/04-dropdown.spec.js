/// <reference types='Cypress'/>

describe('Dropdown', () => {


    it('testTitle', () => {
        cy.visit("http://automationpractice.com/index.php");
        cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').click()
        cy.get('#selectProductSort').select('In stock').should('have.value','quantity:desc')
    });
    
});