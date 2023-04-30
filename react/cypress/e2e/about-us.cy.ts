/// <reference types="cypress" />

describe('Testing About us', () => {
  it('should visit About us', () => {
    cy.visit('/about-us');
    cy.get('[data-testid="about-us"]').should('be.visible');
  });
});
