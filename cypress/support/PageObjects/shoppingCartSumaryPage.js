export class ShoppingCartSumary {
    getProductDescriptionText() {
        return cy.get('.cart_description .product-name')
    }

    getProductPriceText() {
        return cy.get('td[class="cart_unit"]')
    }

    getToCheckoutButton() {
        return cy.get('.cart_navigation > .button')
    }
}