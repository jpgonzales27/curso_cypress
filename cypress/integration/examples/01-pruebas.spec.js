/// <reference types="Cypress"/>

describe("Primer Suite", () => {
  beforeEach(() => {
    cy.visit("http://automationpractice.com/index.php");
  });

  it("Ingresar a la pagina principal y contar cantidad de elementos", () => {
    cy.get("#homefeatured .product-container").should("have.length", 7);

    //Obtener el elmento
    cy.get("#homefeatured .product-container").as("ProductosPopulares");
    cy.get("@ProductosPopulares").should("have.length", 7);

    cy.get("@ProductosPopulares")
      .find(".product-name")
      .each(($el, index, $list) => {

        cy.get('@ProductosPopulares')
            .find('.product-name')
            .each(($el, index, $list) => {
 
                cy.get('@ProductosPopulares').eq(index).find('.price').then(function ($el1) {
                    let precio = $el1.text()
                    cy.log(precio)
 
                    if ($el.attr('title') === 'Printed Dress' && precio.includes('50.99')) {
                        cy.log('Se ha encontrado el elemento buscado')
                        cy.log('Se ha encontrado el precio buscado')
                        cy.get('@ProductosPopulares').eq(index).contains('Add to cart').click()
                    }
                })
 
            })
        cy.get('h2 > .ajax_cart_product_txt')
            .should('contain.text', 'There is 1 item in your cart.')
            .should('be.visible')
      });
  });
});
