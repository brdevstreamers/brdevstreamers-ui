import { streamsRegex, tagsRegex, vodsRegex } from "../../consts/urlRegexes";

describe("Home > Refetch", () => {
  it("should refetch streams after 2Min", () => {
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
    cy.clock()
    cy.visit(Cypress.env("hostUrl"));
    cy.wait(["@streams", "@tags", "@vods"]);

    cy.getByData("card-online").should("have.length", 13);

    cy.intercept(streamsRegex, {
      statusCode: 200,
      fixture: "streams_refetch",
    }).as("streams");
    cy.tick(120 * 1000)
    cy.wait(["@streams", "@tags", "@vods"]);

    cy.getByData("card-online").should("have.length", 2);
  });
});