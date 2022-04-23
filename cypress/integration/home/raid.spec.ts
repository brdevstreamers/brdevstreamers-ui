import { streamsRegex, tagsRegex, vodsRegex } from "../../consts/urlRegexes";

describe("Home > Raid", () => {
  it("should copy raid command to clipboard", () => {
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

    // use the Chrome debugger protocol to grant the current browser window
    // access to the clipboard from the current origin
    // https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-grantPermissions
    // We are using cy.wrap to wait for the promise returned
    // from the Cypress.automation call, so the test continues
    // after the clipboard permission has been granted
    cy.wrap(
      Cypress.automation("remote:debugger:protocol", {
        command: "Browser.grantPermissions",
        params: {
          permissions: ["clipboardReadWrite", "clipboardSanitizedWrite"],
          origin: window.location.origin,
        },
      }),
    );

    cy.visit(Cypress.env("hostUrl"))
      .its("navigator.permissions")
      .invoke("query", { name: "clipboard-read" })
      .its("state")
      .should("equal", "granted");

    cy.wait(["@streams", "@tags", "@vods"]);

    cy.getByDataTest("card-online")
      .first()
      .within(() => {
        cy.findByRole("button", { name: "Raid" }).click();
        cy.window().its("navigator.clipboard").invoke("readText").should("equal", COPIED_TEXT);
      });

    cy.findByRole("alert", { name: `Comando "${COPIED_TEXT}" copiado!` }).should("have.length", 1);
  });
});
