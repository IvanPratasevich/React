/// <reference types="cypress" />

describe('Testing Form', () => {
  beforeEach(() => cy.visit('/form'));

  it('should visit form', () => {
    cy.get('[data-testid="form"]').should('be.visible');
  });

  it(`should render card and show popup with 'Card successfully generated!'`, () => {
    cy.get('[data-testid="name"]').type('Cassandra');
    cy.get('[data-testid="surname"]').type('Maldonado');
    cy.get('[data-testid="date"]').type('1988-05-07');
    cy.get('[data-testid="occupation"]').select('Corporate Agent');
    cy.get('[data-testid="female"]').check();
    cy.get('[data-testid="checkbox"]').check();
    cy.get('[data-testid="image"]').selectFile('./src/assets/logo.png', { force: true });
    cy.get('[data-testid="submit"]').click();
    cy.get('[data-testid="container"]').contains('Cassandra');
    cy.get('[data-testid="popup"]').should('be.visible').contains('Card successfully generated!');
  });

  it(`should show error`, () => {
    cy.get('[data-testid="name"]').type('Cassandra');
    cy.get('[data-testid="surname"]').type('Maldonado');
    cy.get('[data-testid="date"]').type('1988-05-07');
    cy.get('[data-testid="occupation"]').select('Corporate Agent');
    cy.get('[data-testid="female"]').check();
    cy.get('[data-testid="checkbox"]').check();
    cy.get('[data-testid="submit"]').click();
    cy.get('[data-testid="error-image"]').should('be.visible');
  });
});
