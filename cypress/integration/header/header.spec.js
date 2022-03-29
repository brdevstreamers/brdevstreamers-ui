import { streamsRegex, tagsRegex, vodsRegex } from "../../consts/urlRegexes";

describe("Home > Filter", () => {
  it("should have correct links", () => {
    const LINKS = [
      { text: "Assistir", href: "/" },
      { text: "Sobre", href: "/sobre" },
      { text: "Estatísticas", href: "/estatisticas" },
      { text: "Agradecimentos", href: "/agradecimentos" },
      { text: "GitHub", href: "https://github.com/brdevstreamers" },
      { text: "Discord", href: "https://discord.gg/collabcode" },
    ];

    cy.visit(Cypress.env("hostUrl"));

    cy.getByData("header-link").should("have.length", LINKS.length);

    LINKS.forEach(({ text, href }) => {
      cy.getByData("header-link").contains(text).should("have.attr", "href", href);
    });
  });
});
