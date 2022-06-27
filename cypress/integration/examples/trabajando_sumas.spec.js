/// <reference types="Cypress"/>

// Suite de casos de pruebas avanzadas
describe("Tercer feature de casos avanzados", function () {
  beforeEach(() => {
    //Cargamos los valores del archivo example.json en un objeto de datos
    cy.fixture("carritoc").then(function (datos) {
      this.datos = datos;
    });
    //ingresar a la pagina de compra de articulos tecnologicos
    cy.visit("https://demo.opencart.com/index.php");
  });

  //Caso 7

  /*
    it('Realizar compra de celulares basadas en su titulo', function () {
        cy.get("#menu ul a:contains('Phones & PDAs')").click()
 
        this.datos.articulo.forEach(function (articulo) {
            cy.agregarElementoAlCarrito(articulo)
        })
 
        cy.get('.btn-inverse').click()
 
        this.datos.articulo.forEach(function (articulo) {
            cy.verificamosElementoEnCarritoDD(articulo)
        })
 
    })
    */

  //Caso 8
  it("Verificacion de suma de monto total drop down de carrito de compras", function () {
    cy.get("#menu ul a:contains('Phones & PDAs')").click();

    this.datos.articulo.forEach(function (articulo) {
      cy.agregarElementoAlCarrito(articulo);
    });

    cy.get(".btn-inverse").click();

    this.datos.articulo.forEach(function (articulo) {
      cy.verificamosElementoEnCarritoDD(articulo);
    });

    var suma = 0;

    cy.get("tr:has(button) td:contains('$')").each(($el) => {
      const monto = $el.text();
      var precio = monto.replace("$", "");
      suma = Number(suma) + Number(precio);
      cy.log("La suma es: " + suma);
    });

    cy.get(".table.table-bordered :nth-child(4) :contains('$')").then(function (
      $el
    ) {
      const monto = $el.text();
      var total = monto.replace("$", "");
      expect(Number(total)).to.equal(Number(suma));
    });
  });
});
