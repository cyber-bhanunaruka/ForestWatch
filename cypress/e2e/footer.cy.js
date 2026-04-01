describe('Footer Section', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.footer').scrollIntoView()
  })

  it('renders the footer', () => {
    cy.get('.footer').should('exist')
  })

  it('displays the brand name', () => {
    cy.get('.footer__brand').should('contain.text', 'ForestWatch')
  })

  it('shows copyright with current year', () => {
    const year = new Date().getFullYear()
    cy.get('.footer__copy').should('contain.text', `© ${year}`)
    cy.get('.footer__copy').should('contain.text', 'ForestWatch Case Study')
  })

  it('has navigation links', () => {
    cy.get('.footer__links a').should('have.length', 6)
    cy.get('.footer__links a').first().should('contain.text', 'Top')
    cy.get('.footer__links a').last().should('contain.text', 'Impact')
  })

  it('footer links point to correct sections', () => {
    cy.get('.footer__links a').eq(1).should('have.attr', 'href', '#problem')
    cy.get('.footer__links a').eq(4).should('have.attr', 'href', '#dashboard')
  })
})
