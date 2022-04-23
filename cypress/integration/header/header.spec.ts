describe("Header", () => {
  it("should not have broken links", () => {
    cy.visit(Cypress.env("hostUrl"));

    cy.getByDataTest("header-container").within(() => {
      cy.findAllByRole("link").each((link) => {
        cy.request(link.prop("href")).its("status").should("eq", 200);
      });
    });
  });
});
