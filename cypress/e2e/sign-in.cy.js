/// <reference types="cypress" />

describe('Navigation', () => {
  it('should navigate to the Sign In page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Find a link with an href attribute containing "enter" and click it
    cy.get('[data-cy="log in"]').click()

    // The new url should include "/enter"
    cy.url().should('include', '/enter')

    // The new page should contain "Sign in with Google"
    cy.contains('Sign in with Google')
  })
})
