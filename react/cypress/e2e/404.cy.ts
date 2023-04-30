/// <reference types="cypress" />

describe('Testing Not Found', () => {
  it('should visit Not Found', () => {
    cy.visit('/abcd');
    cy.get('[data-testid="404"]').should('be.visible');
  });
});
