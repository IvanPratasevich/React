/// <reference types="cypress" />

describe('Testing Form', () => {
  it('should visit form', () => {
    cy.visit('/form');
    cy.get('[data-testid="form"]').should('be.visible');
  });
});
