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

    cy.getByDataTest("simultaneous-button").click();
    cy.getByDataTest("start-simultaneous-button").click();

    cy.findByRole("alert", { name: "Você deve selecionar pelo menos duas streams" }).should(
      "have.length",
      1,
    );
  });
});
