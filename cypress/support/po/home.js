export const sidebar = {
  getLivesAnchorButton: () => cy.get('[data-testid="livesAnchorButton"]'),
  getLivesAnchor: () => cy.get('[data-testid="livesAnchor"]'),
  getMosaicAnchorButton: () => cy.get('[data-testid="mosaicAnchorButton"]'),
  getMosaicLeaveButton: () => cy.get('[data-testid="mosaicLeaveButton"]'),
  getMosaicPlayButton: () => cy.get('[data-testid="mosaicPlayButton"]'),
  getVodsAnchorButton: () => cy.get('[data-testid="vodsAnchorButton"]'),
  getVodsAnchor: () => cy.get('[data-testid="vodsAnchor"]'),
};

export const mosaicOverlay = {
  getContent: () => cy.get('[data-testid="mosaicOverlay"]'),
  getCloseButton: () => cy.get('[data-testid="mosaicOverlayCloseButton"]'),
};

export const streamList = {
  getStreamerCard: (id) => cy.get(`[data-testid="streamerCard-${id}"]`),
};
