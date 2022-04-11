import { streamsRegex } from "../../consts/urlRegexes";

describe("Home > Error Fallback", () => {
  it("should throw error fallback when request fails", () => {
    cy.intercept(streamsRegex, {
      statusCode: 400,
    });

    cy.visit(Cypress.env("hostUrl"));

    cy.get(".chakra-text").eq(2).should("have.text", "Oops! Algo de errado não está certo");
    cy.get(".chakra-text")
      .eq(3)
      .should("have.text", "Não conseguimos carregar o que você estava procurando 😔");
    cy.get("button").should("have.text", "Tente novamente");
  });
});
