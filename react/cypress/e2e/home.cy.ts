/// <reference types="cypress" />

describe('Should render Home', () => {
  it('should visit Hone', () => {
    cy.visit('/');
    cy.get('[type="search"]').type('search query');
  });
});
