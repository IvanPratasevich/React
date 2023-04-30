/// <reference types="cypress" />

describe('Testing Current Page', () => {
  it('should show current page (Home)', () => {
    cy.visit('/');
    cy.get('[data-testid="header"]').contains('Current page: Home');
  });

  it('should show current page (Form)', () => {
    cy.visit('/form');
    cy.get('[data-testid="header"]').contains('Current page: Form');
  });
});
