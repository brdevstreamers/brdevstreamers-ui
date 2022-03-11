describe("Home > Filter", () => {
    beforeEach(() => {
        cy.fixture('validacao').then((dados) => {
            window.validacao = dados.validacao

        })
      cy.intercept("GET", "https://brstreamers.dev:8000/public/streams", {
        statusCode: 200,
        fixture: "streams",
      }).as("streams");
      cy.intercept("GET", "https://brstreamers.dev:8000/public/tags", {
        statusCode: 200,
        fixture: "tags",
      }).as("tags");
    });
    it ("You must select at least two streams", () => {
        cy.visit('http://localhost:3000')
        cy.wait("@streams");
        cy.wait("@tags");
        cy.simultaneousButton()
        cy.startSimultaneous()
        cy.closeAlert()

    }) 
});
