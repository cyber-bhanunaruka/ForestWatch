describe('Hero Section', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders the hero section', () => {
    cy.get('#hero').should('exist')
  })

  it('displays the eyebrow text', () => {
    cy.get('.hero__eyebrow').should('contain.text', 'UX Case Study')
  })

  it('displays the main title', () => {
    cy.get('.hero__title').should('contain.text', 'Mapping the world')
    cy.get('.hero__title--accent').should('contain.text', 'before they disappear')
  })

  it('displays the subtitle', () => {
    cy.get('.hero__subtitle').should('contain.text', 'FAANG-level case study')
  })

  it('shows project meta information', () => {
    cy.get('.hero__meta-item').should('have.length', 3)
    cy.get('.hero__meta-label').first().should('contain.text', 'Role')
    cy.get('.hero__meta-value').first().should('contain.text', 'Lead Product Designer')
  })

  it('has two CTA buttons', () => {
    cy.get('.hero__cta').should('have.length', 2)
    cy.get('.hero__cta').first().should('contain.text', 'Explore the case study')
    cy.get('.hero__cta--ghost').should('contain.text', 'Jump to dashboard')
  })

  it('animates content on load', () => {
    cy.get('.hero__content').should('have.class', 'visible')
  })

  it('CTA scrolls to problem section', () => {
    cy.get('.hero__cta').first().click()
    cy.get('#problem').should('be.visible')
  })
})
