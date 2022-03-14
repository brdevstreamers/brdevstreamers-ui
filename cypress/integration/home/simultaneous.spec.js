describe("Home > Filter", () => {
  it("You must select at least two streams", () => {
    cy.intercept("GET", "https://brstreamers.dev:8000/public/streams", {
      statusCode: 200,
      fixture: "streams",
    }).as("streams");
    cy.intercept("GET", "https://brstreamers.dev:8000/public/tags", {
      statusCode: 200,
      fixture: "tags",
    }).as("tags");
    cy.visit(Cypress.env("hostUrl"));
    cy.wait("@streams");
    cy.wait("@tags");

    cy.getByData("simultaneous-button").click();
    cy.getByData("start-simultaneous-button").click();
    cy.get(".chakra-toast")
      .should("have.length", 1)
      .contains("Você deve selecionar pelo menos duas streams");
  });
});
