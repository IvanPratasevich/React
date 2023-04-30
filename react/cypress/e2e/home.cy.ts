/// <reference types="cypress" />

describe('Testing home', () => {
  it('should visit Home', () => {
    cy.visit('/');
    cy.get('[type="search"]').should('be.visible');
  });

  it('should render cards', () => {
    cy.intercept('GET', '**/characters').as('getCharacters');
    cy.visit('/');
    cy.wait('@getCharacters', { timeout: 10000 });
    cy.get('.container').contains('Jackie Welles');
  });

  it('should open modal', () => {
    cy.intercept('GET', '**/characters').as('getCharacters');
    cy.visit('/');
    cy.wait('@getCharacters', { timeout: 10000 });
    cy.intercept('GET', '**/characters/id/3').as('getCharacterById');
    cy.get('[data-testid="submit-3"]').click();
    cy.wait('@getCharacterById', { timeout: 10000 });
    cy.get('[data-testid="modal"]').contains('2044');
  });
});
