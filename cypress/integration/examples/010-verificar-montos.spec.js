/// <reference types='Cypress'/>

describe('description', () => {

    
    before(() => {
        cy.fixture('articulos').then((datos) => {
            globalThis.datos = datos
        })
    });
    
    
    beforeEach(() => {
        cy.visit('https://demo.opencart.com/index.php?route=common/home');
    });
    

    it.only('Verificar si la suma es igual al total', () => {
        
        let suma = 0;
        let total = 0
        cy.get('#menu').contains('Phones & PDAs').click()

        datos.articulos.forEach( e => {
            cy.agregarElementoAlCarrito(e)
        })
        cy.get('.btn-inverse').click()  

        datos.articulos.forEach( e => {
            cy.verificarCarrito(e)
        })

        cy.get('tr:has(button) td:contains($)').each(($el,index,$list)=>{
            cy.log($el.text()) 
            suma += Number.parseFloat($el.text().substring(1))
            cy.log(`$la suma de los 3 es ${suma}`) 
        })

        cy.get('.table.table-bordered tr').last().contains('$').then((result) => {
          total = Number.parseFloat(result.text().substring(1))
        //   total = result.text().substring(1)
          cy.log(`el total es ${total}`) 
          expect(suma).to.equal(total) 

        })

    });
});