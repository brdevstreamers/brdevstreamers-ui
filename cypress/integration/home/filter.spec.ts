import { streamsRegex, tagsRegex, vodsRegex } from "../../consts/urlRegexes";

describe("Home > Filter", () => {
  beforeEach(() => {
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
  });

  it("should filter out streams by tags change the URL", () => {
    const PROGRAMMING_TEXT = "Programação";
    const JAVASCRIPT_TEXT = "JavaScript";
    const LGBTQIA_TEXT = "LGBTQIA+";

    cy.visit(Cypress.env("hostUrl"));
    cy.wait(["@streams", "@tags", "@vods"]);

    cy.getByDataTest("card-online").should("have.length", 13);

    cy.filterByTag(PROGRAMMING_TEXT);
    cy.shouldUrlContainTags(PROGRAMMING_TEXT);
    cy.getByDataTest("card-online").should("have.length", 2);

    cy.unFilterByTag(PROGRAMMING_TEXT);
    cy.getByDataTest("card-online").should("have.length", 13);

    cy.filterByTag(PROGRAMMING_TEXT);
    cy.filterByTag(JAVASCRIPT_TEXT);
    cy.shouldUrlContainTags(PROGRAMMING_TEXT, JAVASCRIPT_TEXT);
    cy.getByDataTest("card-online").should("have.length", 1);

    cy.filterByTag(LGBTQIA_TEXT);
    cy.shouldUrlContainTags(PROGRAMMING_TEXT, JAVASCRIPT_TEXT, LGBTQIA_TEXT);
    cy.getByDataTest("card-online").should("have.length", 0);

    cy.unFilterByTag(LGBTQIA_TEXT);
    cy.getByDataTest("card-online").should("have.length", 1);

    cy.unFilterByTag(JAVASCRIPT_TEXT);
    cy.getByDataTest("card-online").should("have.length", 2);

    cy.unFilterByTag(PROGRAMMING_TEXT);
    cy.getByDataTest("card-online").should("have.length", 13);
  });

  it("should accept the tag query string to filter out streams", () => {
    const JAVASCRIPT_TEXT = "JavaScript";

    cy.visit(`http://localhost:3000/?tags=${JAVASCRIPT_TEXT}`);
    cy.wait(["@streams", "@tags", "@vods"]);

    cy.getByDataTest("tag-filter")
      .contains(JAVASCRIPT_TEXT)
      .should("have.css", "backgroundColor", "rgb(139, 61, 255)")
      .should("have.length", 1);

    cy.getByDataTest("card-online").should("have.length", 3);
  });
});
