describe("About", () => {
  it("should not have broken links", () => {
    cy.visit(`${Cypress.env("hostUrl")}/sobre`);

    cy.getByDataTest("accordion-container").within(() => {
      cy.findAllByRole("link").each((link) => {
        cy.request(link.prop("href")).its("status").should("eq", 200);
      });
    });
  });
});
