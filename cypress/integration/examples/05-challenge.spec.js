/// <reference types='Cypress'/>

describe('Challenge', () => {

    it.only('Challenge mio', () => {
        cy.visit("http://automationpractice.com/index.php");
        cy.get('#search_query_top').type('Blouse')
        cy.get('#searchbox > .btn').click()
        cy.get('.product-container .product-name').should('contain.text', 'Blouse')
        cy.get('a[title="Add to cart"] span').click({ force: true })
        cy.get('a[title="Proceed to checkout"] span').click()
        cy.get('.cart_description .product-name').should('have.text', 'Blouse')
        cy.get('td[class="cart_unit"]').should('contain.text','$27.00')
        cy.get('.cart_navigation > .button').click()
        cy.get('#email').type('jp@gmail.com')
        cy.get('#passwd').type('123456')
        cy.get('#SubmitLogin').click()
        cy.get('.cart_navigation > .button').click()
        cy.get('#cgv').check()
        cy.get('.cart_navigation > .button').click()
        cy.get('.bankwire').click()
        cy.get('#cart_navigation > .button').click()
        cy.get('.cheque-indent').should('contain.text','Your order on My Store is complete.')
    });

    it('Crear una compra desde cero', function () {
        cy.get('#search_query_top').type('Blouse')
        cy.get('#searchbox > .btn').click()
        cy.get('.product-container:has(.product-name[title="Blouse"]) .ajax_add_to_cart_button').click()
        cy.get('.button-medium[title="Proceed to checkout"]').click()
 
        cy.get('tr[id^=product]').find('.product-name > a').should('contain.text', 'Blouse')
        cy.get('tr[id^=product]').find('.price').should('contain.text', '27.00')
        cy.get('.cart_navigation > .button').click()
        cy.get('#email').type('cypress@ateneaconocimientos.net')
        cy.get('#passwd').type('Atenea')
        cy.get('#SubmitLogin').click()
        cy.get('.cart_navigation > .button').click()
        cy.get('#cgv').check().should('be.checked')
        cy.get('.cart_navigation > .button').click()
        cy.get('.bankwire').click()
        cy.get('.cart_navigation > .button').click()
        cy.get('.cheque-indent > .dark').should('contain.text','Your order on My Store is complete.')
    })
});