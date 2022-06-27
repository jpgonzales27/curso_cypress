export class AuthenticationPage {
    getEmailInput() {
        return cy.get('#email')
    }

    getPasswordInput() {

        return cy.get('#passwd')

    }

    getSingInButton() {
        return  cy.get('#SubmitLogin')
    }
}