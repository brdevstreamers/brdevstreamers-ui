import streams from "../fixtures/streams";
import { mosaicOverlay, sidebar, streamList } from "../support/po/home";

describe("Home", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept(/\/public\/streams$/, { body: streams });
    cy.intercept(/\/public\/vods$/, { fixture: "vods.json" });
  });

  describe("Lives", () => {
    it("should go to lives section", () => {
      sidebar.getLivesAnchorButton().click();
      sidebar.getLivesAnchor().should("be.visible");
    });
  });

  describe("Mosaic", () => {
    it("should open and cancel mosaic mode", () => {
      sidebar.getMosaicAnchorButton().click();
      sidebar.getMosaicLeaveButton().click();
      sidebar.getMosaicLeaveButton().should("not.exist");
    });

    it("should open mosaic mode and close", () => {
      const [firstStream] = streams;
      sidebar.getMosaicAnchorButton().click();
      streamList.getStreamerCard(firstStream.id).click();
      sidebar.getMosaicPlayButton().click();
      mosaicOverlay.getContent().should("be.visible");
      cy.wait(5000);
      mosaicOverlay.getCloseButton().click();
      mosaicOverlay.getContent().should("not.exist");
    });
  });

  describe("Vods", () => {
    it("should go to vods section", () => {
      sidebar.getVodsAnchorButton().click();
      sidebar.getVodsAnchor().should("be.visible");
    });
  });
});
