import type { Selectors } from "./@types/selectors";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to get element by data-test attribute
       * @param selector data-test attribute value
       * @param options
       * @example
       * cy.getByDataTest('someDataTestValue')
       */
      getByDataTest: typeof getByDataTest;

      /**
       * Custom command to filter by tag name
       * @param tag tag name to filter
       * @example
       * cy.filterByTag('JavaScript')
       */
      filterByTag: typeof filterByTag;

      /**
       * Custom command to unfilter by tag name
       * @param tag tag name to unfilter
       * @example
       * cy.unFilterByTag('JavaScript')
       */
      unFilterByTag: typeof unFilterByTag;

      /**
       * Custom command to check if url contain specified tags
       * @param tags tags to check in url
       * @example
       * cy.shouldUrlContainTags('JavaScript')
       * cy.shouldUrlContainTags('JavaScript', 'LGBTQIA+')
       */
      shouldUrlContainTags: typeof shouldUrlContainTags;
    }
  }
}

const getByDataTest = (
  selector: Selectors,
  options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>,
) => {
  const log = Cypress.log({
    displayName: "getByDataTest",
    name: "Get by [data-test] attribute",
  });

  cy.on("fail", (error) => {
    log.error(error);
    log.end();
    throw error;
  });

  return cy.get(`[data-test=${selector}]`, options);
};

const filterByTag = (tag: string) => {
  const encodedTag = encodeURIComponent(tag);

  const log = Cypress.log({
    autoEnd: false,
    displayName: "filterByTag",
    name: `Filtering by ${tag}`,
  });

  cy.on("fail", (error) => {
    log.error(error);
    log.end();
    throw error;
  });

  return cy
    .getByDataTest("tag-filter")
    .contains(tag)
    .then(($el) => {
      log.set({ $el });
      log.snapshot();
      log.end();
    })
    .should("have.prop", "tagName", "A")
    .should("have.attr", "href", `?tags=${encodedTag}`)
    .click();
};

const unFilterByTag = (tag: string) => {
  const log = Cypress.log({
    autoEnd: false,
    displayName: "unFilterByTag",
    name: `Unfiltering by ${tag}`,
  });

  cy.on("fail", (error) => {
    log.error(error);
    log.end();
    throw error;
  });

  return cy
    .getByDataTest("tag-filter")
    .contains(tag)
    .then(($el) => {
      log.set({ $el });
      log.snapshot();
      log.end();
    })
    .click();
};

const shouldUrlContainTags = (...tags: Array<string>) => {
  Cypress.log({
    displayName: "shouldUrlContainTags",
    name: `Check if Url contains ${tags.join(", ")}`,
  });

  cy.url().should("contain", `?tags=${encodeURIComponent(tags.join(","))}`);
};

Cypress.on("uncaught:exception", () => false);

Cypress.Commands.add("getByDataTest", getByDataTest);
Cypress.Commands.add("filterByTag", filterByTag);
Cypress.Commands.add("unFilterByTag", unFilterByTag);
Cypress.Commands.add("shouldUrlContainTags", shouldUrlContainTags);

/*
eslint
  @typescript-eslint/no-namespace: "off",
*/
