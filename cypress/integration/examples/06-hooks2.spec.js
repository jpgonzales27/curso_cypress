/// <reference types="Cypress"/>

// Suite de casos de prueba avanzados 
describe('Segundo conjunto de casos de pruebas avanzadas', function () {
    before( function() {
        //Cargamos los valores del archivo example.json en un objeto de datos
        cy.fixture('example').then((datos) => {
            this.datos = datos
            cy.fixture(this.datos.imagen).as('imagen')

        })
    })
    beforeEach(() => {
        //Ingresamos a la pagina de formulario
        cy.visit('https://demoqa.com/automation-practice-form')
    })

    //Caso 7
    it('Lleanmos nuestro primer formulario utilizando data', function()  {

        cy.get('#firstName').type(this.datos.nombre)
        cy.get('#lastName').type(this.datos.apellido)
        cy.get('#userEmail').type(this.datos.email)
        cy.get(`input[name=gender][value=${this.datos.sexo}]`).check({ force: true }).should('be.checked')
        cy.get('#userNumber').type(this.datos.telefono)
        cy.get('#dateOfBirthInput').click()
        cy.get('.react-datepicker__month-select').should('be.visible').select(this.datos.fechaDeNacimiento[0])
        cy.get('.react-datepicker__year-select').should('be.visible').select(this.datos.fechaDeNacimiento[1])
        cy.get(`.react-datepicker__day--0${this.datos.fechaDeNacimiento[2]}`).click()
        cy.get('#dateOfBirthInput')
            .should('contain.value', this.datos.fechaDeNacimiento[0].substring(0, 2))
            .should('contain.value', this.datos.fechaDeNacimiento[1])
            .should('contain.value', this.datos.fechaDeNacimiento[2])
        cy.get('.subjects-auto-complete__value-container').type(`${this.datos.materia}{enter}`).should('contain.text',this.datos.materia)
        cy.get('#hobbiesWrapper').contains(this.datos.hobbies[0]).click()
        cy.get('#hobbiesWrapper').contains(this.datos.hobbies[1]).click()
        cy.get('#uploadPicture').then((el) => {
            //convertir la imagen en un string de base64
            const blob = Cypress.Blob.base64StringToBlob(this.imagen, 'image/png')

            const file = new File([blob], this.datos.imagen, { type: 'image/png' })
            const list = new DataTransfer()

            list.items.add(file)
            const myFileList = list.files

            el[0].files = myFileList
            el[0].dispatchEvent(new Event('change', { bubbles: true }))
        })


    })

})