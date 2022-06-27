export class ModalPage {
    getProceedToCheckoutButton(){
        return cy.get('a[title="Proceed to checkout"] span')
    }
}