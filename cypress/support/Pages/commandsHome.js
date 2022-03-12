const el = require('../Pages/elementHome').ELEMENTS;
Cypress.Commands.add("simultaneousButton",() =>{
    cy.get(el.simultaneousButton).click()
})
Cypress.Commands.add("startSimultaneous",() =>{
    cy.get(el.startSimultaneous).click()
})
Cypress.Commands.add("closeAlert",() =>{
    cy.get(el.closeAlert).click()
})
