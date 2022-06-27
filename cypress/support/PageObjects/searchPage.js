export class SearchPage {

    getProductName() {
        return cy.get('.product-container .product-name')

    }

    getAddToCardButton() {
        return cy.get('a[title="Add to cart"] span')
    }
}