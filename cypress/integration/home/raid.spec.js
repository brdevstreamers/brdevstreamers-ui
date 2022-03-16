import { streamsRegex, tagsRegex, vodsRegex } from "../../consts/urlRegexes";

describe("Home > Raid", () => {
  it("Copy raid command to clipboard", () => {
    const COPIED_TEXT = "/raid emersongarrido";

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

    cy.getByData("raid-button").first().click();
    cy.get(".chakra-toast").should("have.length", 1).contains(`Comando "${COPIED_TEXT}" copiado!`);

    cy.window().then((window) => {
      window.navigator.clipboard.readText().then((text) => {
        assert.equal(text, COPIED_TEXT);
      });
    });
  });
});
