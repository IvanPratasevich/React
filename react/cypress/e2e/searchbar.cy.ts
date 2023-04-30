/// <reference types="cypress" />

describe('Testing Search Bar', () => {
  it('should work search and displaying card', () => {
    cy.visit('/');
    cy.intercept('GET', '**/characters/name/panam').as('getCharacter');
    cy.get('[type="search"]').type('panam').type('{enter}');
    cy.wait('@getCharacter', { timeout: 10000 });
    cy.get('[data-testid="submit-1"]').should('be.visible');
  });

  it(`should work search and displaying not found "Cards not found!"`, () => {
    cy.visit('/');
    cy.intercept('GET', '**/characters/name/fake').as('getCharacter');
    cy.get('[type="search"]').type('fake').type('{enter}');
    cy.wait('@getCharacter', { timeout: 10000 });
    cy.get('main').contains('Cards not found!');
  });
});
