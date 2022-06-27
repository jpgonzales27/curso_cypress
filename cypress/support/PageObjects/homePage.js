export class HomePage {
    getSearchBoxInput() {
        return cy.get('#search_query_top')
    }

    getSearchBoxButton() {
        return cy.get('#searchbox > .btn')
    }
}