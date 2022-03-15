import { streamsRegex, tagsRegex, vodsRegex } from "../../consts/urlRegexes";

describe("Home > Simultaneous", () => {
  it("You must select at least two streams", () => {
    cy.intercept(streamsRegex, {
      statusCode: 200,
      fixture: "streams",
    }).as("streams");
    cy.intercept(tagsRegex, {
      statusCode: 200,
      fixture: "tags",
    }).as("tags");
    cy.intercept(vodsRegex, {
      statusCode: 200,
      fixture: "vods",
    }).as("vods");
    cy.visit(Cypress.env("hostUrl"));
    cy.wait(["@streams", "@tags", "@vods"]);

    cy.getByData("simultaneous-button").click();
    cy.getByData("start-simultaneous-button").click();
    cy.get(".chakra-toast")
      .should("have.length", 1)
      .contains("Você deve selecionar pelo menos duas streams");
  });
});
