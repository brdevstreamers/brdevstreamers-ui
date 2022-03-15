describe("Home > Filter", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://brstreamers.dev:8000/public/streams", {
      statusCode: 200,
      fixture: "streams",
    }).as("streams");
    cy.intercept("GET", "https://brstreamers.dev:8000/public/tags", {
      statusCode: 200,
      fixture: "tags",
    }).as("tags");
  });

  it("should filter out streams by tags change the URL", () => {
    const PROGRAMMING_TEXT = "Programação";
    const PROGRAMMING_TEXT_ENCODED = encodeURIComponent(PROGRAMMING_TEXT);
    const JAVASCRIPT_TEXT = "JavaScript";
    const LGBTQIA_TEXT = "LGBTQIA+";
    const LGBTQIA_TEXT_ENCODED = encodeURIComponent("LGBTQIA+");

    cy.visit(Cypress.env("hostUrl"));
    cy.wait("@streams");
    cy.wait("@tags");

    cy.getByData("card-online").should("have.length", 13);

    cy.getByData("tag-filter-item-unselected")
      .contains(PROGRAMMING_TEXT)
      .should("have.prop", "tagName", "A")
      .should("have.attr", "href", `?tags=${PROGRAMMING_TEXT_ENCODED}`)
      .click();
    cy.getByData("card-online").should("have.length", 2);

    cy.url().should("contain", `?tags=${PROGRAMMING_TEXT_ENCODED}`);

    cy.getByData("tag-filter-item-selected").contains(PROGRAMMING_TEXT).click();
    cy.getByData("card-online").should("have.length", 13);

    cy.getByData("tag-filter-item-unselected").contains(PROGRAMMING_TEXT).click();

    cy.getByData("tag-filter-item-unselected")
      .contains(JAVASCRIPT_TEXT)
      .should("have.prop", "tagName", "A")
      .should("have.attr", "href", `?tags=${JAVASCRIPT_TEXT}`)
      .click();

    cy.url().should(
      "contain",
      `?tags=${encodeURIComponent(`${PROGRAMMING_TEXT},${JAVASCRIPT_TEXT}`)}`,
    );

    cy.getByData("card-online").should("have.length", 1);

    cy.getByData("tag-filter-item-unselected")
      .contains(LGBTQIA_TEXT)
      .should("have.prop", "tagName", "A")
      .should("have.attr", "href", `?tags=${LGBTQIA_TEXT_ENCODED}`)
      .click();

    cy.url().should(
      "contain",
      `?tags=${encodeURIComponent(`${PROGRAMMING_TEXT},${JAVASCRIPT_TEXT},${LGBTQIA_TEXT}`)}`,
    );

    cy.getByData("card-online").should("have.length", 0);

    cy.getByData("tag-filter-item-selected").contains(LGBTQIA_TEXT).click();
    cy.getByData("card-online").should("have.length", 1);

    cy.getByData("tag-filter-item-selected").contains(JAVASCRIPT_TEXT).click();
    cy.getByData("card-online").should("have.length", 2);

    cy.getByData("tag-filter-item-selected").contains(PROGRAMMING_TEXT).click();
    cy.getByData("card-online").should("have.length", 13);
  });

  it("should accept the tag query string to filter out streams", () => {
    const JAVASCRIPT_TEXT = "JavaScript";

    cy.visit(`http://localhost:3000/?tags=${JAVASCRIPT_TEXT}`);
    cy.wait("@streams");
    cy.wait("@tags");

    cy.getByData("tag-filter-item-selected")
      .contains(JAVASCRIPT_TEXT)
      .should("have.css", "backgroundColor", "rgb(139, 61, 255)")
      .should("have.length", 1);
    cy.getByData("card-online").should("have.length", 3);
  });
});
