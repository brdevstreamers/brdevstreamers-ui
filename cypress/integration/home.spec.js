import { sidebar } from "../support/po/home";

describe("Home", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("/public/streams", { fixture: "streams.json" });
    cy.intercept("/public/vods", { fixture: "vods.json" });
  });

  it("should go to lives section", () => {
    sidebar.getLivesAnchorButton().click();
    sidebar.getLivesAnchor().should("be.visible");
  });

  it("should go to vods section", () => {
    sidebar.getVodsAnchorButton().click();
    sidebar.getVodsAnchor().should("be.visible");
  });
});
