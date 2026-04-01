describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders the navbar with brand name', () => {
    cy.get('.nav').should('exist')
    cy.get('.nav__name').should('contain.text', 'Forest')
    cy.get('.nav__name--accent').should('contain.text', 'Watch')
  })

  it('shows all navigation links', () => {
    const sections = ['Problem', 'Research', 'UX Strategy', 'Dashboard', 'Impact']
    sections.forEach((label) => {
      cy.get('.nav__link').contains(label).should('be.visible')
    })
  })

  it('displays the Case Study badge', () => {
    cy.get('.nav__badge').should('contain.text', 'Case Study')
  })

  it('adds scrolled class on scroll', () => {
    cy.get('.nav').should('not.have.class', 'nav--scrolled')
    cy.scrollTo(0, 100)
    cy.get('.nav').should('have.class', 'nav--scrolled')
  })

  it('navigates to sections on link click', () => {
    cy.get('.nav__link').contains('Problem').click()
    cy.get('#problem').should('be.visible')
  })

  it('hamburger button has aria-expanded', () => {
    cy.get('.nav__hamburger').should('have.attr', 'aria-expanded', 'false')
  })
})
