describe('Accessibility', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('page has a main landmark', () => {
    cy.get('main').should('exist')
  })

  it('page has a nav landmark', () => {
    cy.get('nav').should('exist')
  })

  it('page has a footer landmark', () => {
    cy.get('footer').should('exist')
  })

  it('all sections have unique ids', () => {
    const ids = new Set()
    cy.get('section[id]').each(($el) => {
      const id = $el.attr('id')
      expect(ids.has(id)).to.be.false
      ids.add(id)
    })
  })

  it('search input has aria-label', () => {
    cy.get('.dashboard__search-input').should('have.attr', 'aria-label')
  })

  it('hamburger has aria-expanded attribute', () => {
    cy.get('.nav__hamburger').should('have.attr', 'aria-expanded')
  })

  it('hamburger has aria-label', () => {
    cy.get('.nav__hamburger').should('have.attr', 'aria-label')
  })

  it('view toggle buttons have aria-pressed', () => {
    cy.get('#dashboard').scrollIntoView()
    cy.get('.dash-btn').each(($btn) => {
      cy.wrap($btn).should('have.attr', 'aria-pressed')
    })
  })

  it('close panel button has aria-label', () => {
    cy.get('#dashboard').scrollIntoView()
    cy.get('.dashboard__region-item').first().click()
    cy.get('.panel__close').should('have.attr', 'aria-label')
  })

  it('decorative logo SVGs have aria-hidden', () => {
    cy.get('.nav__brand svg').should('have.attr', 'aria-hidden', 'true')
  })
})
