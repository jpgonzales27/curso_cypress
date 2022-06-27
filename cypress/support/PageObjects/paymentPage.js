export class PaymentPage {
    getPayBankwireOptionButton () {
        return cy.get('.bankwire')
    }
    getConfirmOrderButton () {
        return  cy.get('#cart_navigation > .button')
    }

    getDescriptionTitleText () {
        return   cy.get('.cheque-indent')
    }
}
