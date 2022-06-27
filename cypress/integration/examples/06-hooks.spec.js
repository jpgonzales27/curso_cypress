/// <reference types='Cypress'/>
import "cypress-file-upload";

describe("description", () => {
  before(() => {
    cy.fixture("example").then((datos) => {
      globalThis.datos = datos;
    });
  });

  beforeEach(() => {
    cy.visit("https://demoqa.com/automation-practice-form");
  });

  it("llenar formulario utilizando data", { viewportHeight: 1200 }, () => {
    cy.get("#firstName").type(datos.nombre);
    cy.get("#lastName").type(datos.apellido);
    // cy.get('#userEmail').type(datos.email)
    cy.get(`input[name=gender][value=${datos.sexo}]`)
      .check({ force: true })
      .should("be.checked");
    cy.get("#userNumber").type(datos.telefono);
    cy.get("#dateOfBirthInput").click();
    cy.get(".react-datepicker__month-select")
      .should("be.visible")
      .select(datos.fechaDeNacimiento[0]);
    cy.get(".react-datepicker__year-select")
      .should("be.visible")
      .select(datos.fechaDeNacimiento[1]);
    cy.get(`.react-datepicker__day--0${datos.fechaDeNacimiento[2]}`).click();
    cy.get("#dateOfBirthInput")
      .should("contain.value", datos.fechaDeNacimiento[0].substring(0, 2))
      .should("contain.value", datos.fechaDeNacimiento[1])
      .should("contain.value", datos.fechaDeNacimiento[2]);
    cy.get(".subjects-auto-complete__value-container")
      .type(`${datos.materia}{enter}`)
      .should("contain.text", datos.materia);
    cy.get("#hobbiesWrapper").contains(datos.hobbies[0]).click();
    cy.get("#hobbiesWrapper").contains(datos.hobbies[1]).click();

    const path = `${datos.imagen}`;
    cy.get("#uploadPicture").attachFile(path);
    cy.get("#currentAddress").type(datos.direccion);
    cy.get("#stateCity-wrapper").contains("Select State").click();
    cy.get("div[id^=react-select]").contains(datos.estado).click();
    cy.get("#stateCity-wrapper").contains("Select City").click();
    cy.get("div[id^=react-select]").contains(datos.ciudad).click();
    cy.get("#submit").click();

    cy.get("#example-modal-sizes-title-lg").should(
      "have.text",
      "Thanks for submitting the form"
    );
    cy.get(".table-responsive")
      .contains("Student Name")
      .nextAll()
      .should("have.text", `${datos.nombre} ${datos.apellido}`);
    cy.get(".table-responsive")
      .contains("Student Email")
      .nextAll()
      .should("have.text", datos.email);
    cy.get(".table-responsive")
      .contains("Gender")
      .nextAll()
      .should("have.text", datos.sexo);
    cy.get(".table-responsive")
      .contains("Mobile")
      .nextAll()
      .should("contain.text", datos.telefono);
    cy.get(".table-responsive")
      .contains("Date of Birth")
      .nextAll()
      .should(
        "have.text",
        `${datos.fechaDeNacimiento[2]} ${datos.fechaDeNacimiento[0]},${datos.fechaDeNacimiento[1]}`
      );
    cy.get(".table-responsive")
      .contains("Subjects")
      .nextAll()
      .should("have.text", datos.materia);
    cy.get(".table-responsive")
      .contains("Hobbies")
      .nextAll()
      .should("have.text", `${datos.hobbies[0]}, ${datos.hobbies[1]}`);
    cy.get(".table-responsive")
      .contains("Picture")
      .nextAll()
      .should("have.text", datos.imagen);
    cy.get(".table-responsive")
      .contains("Address")
      .nextAll()
      .should("have.text", datos.direccion);
    cy.get(".table-responsive")
      .contains("State and City")
      .nextAll()
      .should("have.text", `${datos.estado} ${datos.ciudad}`);
  });
});
