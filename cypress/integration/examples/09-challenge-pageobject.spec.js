/// <reference types='Cypress'/>

import { AddressPage } from '../../support/PageObjects/addressPage'
import { AuthenticationPage } from '../../support/PageObjects/authenticationPage';
import { HomePage } from '../../support/PageObjects/homePage';
import { ModalPage } from '../../support/PageObjects/modalPage';
import { PaymentPage } from '../../support/PageObjects/paymentPage';
import { SearchPage } from '../../support/PageObjects/searchPage';
import { ShippingPage } from '../../support/PageObjects/shippingPage';
import { ShoppingCartSumary } from '../../support/PageObjects/shoppingCartSumaryPage';


describe('description', () => {

    const addressPage = new AddressPage()
    const authenticationPage = new AuthenticationPage()
    const homePage = new HomePage()
    const modalPage = new ModalPage()
    const paymentPage = new PaymentPage()
    const searchPage = new SearchPage()
    const shippingPage = new ShippingPage()
    const shoppingCartSumary = new ShoppingCartSumary()


    before(() => {
        cy.visit("http://automationpractice.com/index.php");
    });


    it('test page object', () => {
        homePage.getSearchBoxInput().type('Blouse')
        homePage.getSearchBoxButton().click()
        searchPage.getProductName().should('contain.text', 'Blouse')
        searchPage.getAddToCardButton().click({ force: true })
        modalPage.getProceedToCheckoutButton().click()
        shoppingCartSumary.getProductDescriptionText().should('have.text', 'Blouse')
        shoppingCartSumary.getProductPriceText().should('contain.text', '$27.00')
        shoppingCartSumary.getToCheckoutButton().click()
        authenticationPage.getEmailInput().type('jp@gmail.com')
        authenticationPage.getPasswordInput().type('123456')
        authenticationPage.getSingInButton().click()
        addressPage.getProccedToCheckoutButton().click()
        shippingPage.getTermsOfServiceCheckBox().check()
        shippingPage.getProceedToCheckOutButton().click()
        paymentPage.getPayBankwireOptionButton().click()
        paymentPage.getConfirmOrderButton().click()
        paymentPage.getDescriptionTitleText().should('contain.text', 'Your order on My Store is complete.')
    });
});