describe('Dashboard Section', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#dashboard').scrollIntoView()
  })

  it('renders the dashboard section', () => {
    cy.get('#dashboard').should('exist')
    cy.get('#dashboard .section-title').should('contain.text', 'Global Forest Monitor')
  })

  it('displays map and timeline toggle buttons', () => {
    cy.get('.dash-btn').should('have.length', 2)
    cy.get('.dash-btn').contains('Map View').should('exist')
    cy.get('.dash-btn').contains('Timeline').should('exist')
  })

  it('map view button is active by default', () => {
    cy.get('.dash-btn').contains('Map View').should('have.class', 'active')
    cy.get('.dash-btn').contains('Map View').should('have.attr', 'aria-pressed', 'true')
  })

  it('switches to timeline view', () => {
    cy.get('.dash-btn').contains('Timeline').click()
    cy.get('.dash-btn').contains('Timeline').should('have.class', 'active')
    cy.get('.timeline').should('be.visible')
  })

  it('switches back to map view', () => {
    cy.get('.dash-btn').contains('Timeline').click()
    cy.get('.dash-btn').contains('Map View').click()
    cy.get('.dash-btn').contains('Map View').should('have.class', 'active')
  })

  describe('Sidebar', () => {
    it('renders the sidebar with region list', () => {
      cy.get('.dashboard__sidebar').should('exist')
      cy.get('.dashboard__region-item').should('have.length.at.least', 1)
    })

    it('shows region count', () => {
      cy.get('.dashboard__count').should('not.be.empty')
    })

    it('has a search input with accessible label', () => {
      cy.get('.dashboard__search-input')
        .should('have.attr', 'aria-label')
        .and('not.be.empty')
    })

    it('filters regions by search', () => {
      cy.get('.dashboard__region-item').then(($items) => {
        const initialCount = $items.length
        cy.get('.dashboard__search-input').type('Amazon')
        cy.wait(400)
        cy.get('.dashboard__region-item').should('have.length.below', initialCount)
        cy.get('.dashboard__region-name').first().should('contain.text', 'Amazon')
      })
    })

    it('shows clear button when search has text', () => {
      cy.get('.dashboard__search-clear').should('not.exist')
      cy.get('.dashboard__search-input').type('test')
      cy.get('.dashboard__search-clear').should('be.visible')
    })

    it('clears search input', () => {
      cy.get('.dashboard__search-input').type('test')
      cy.get('.dashboard__search-clear').click()
      cy.get('.dashboard__search-input').should('have.value', '')
    })

    it('shows empty state for no results', () => {
      cy.get('.dashboard__search-input').type('xyznonexistent')
      cy.wait(400)
      cy.get('.dashboard__empty').should('be.visible')
      cy.get('.dashboard__empty').should('contain.text', 'No regions match')
    })

    it('displays threat level filter buttons', () => {
      cy.get('.dashboard__filter-btn').should('have.length', 5)
      cy.get('.dashboard__filter-btn').first().should('contain.text', 'All')
    })

    it('filters by threat level', () => {
      cy.get('.dashboard__filter-btn').contains('critical').click()
      cy.get('.dashboard__filter-btn').contains('critical').should('have.class', 'active')
    })

    it('selects a region on click', () => {
      cy.get('.dashboard__region-item').first().click()
      cy.get('.dashboard__region-item').first().should('have.class', 'active')
    })

    it('shows reset button after region selection', () => {
      cy.get('.dashboard__region-item').first().click()
      cy.get('.dashboard__reset').should('be.visible')
      cy.get('.dashboard__reset').should('contain.text', 'Reset to global view')
    })

    it('resets selection', () => {
      cy.get('.dashboard__region-item').first().click()
      cy.get('.dashboard__reset').click()
      cy.get('.dashboard__region-item.active').should('not.exist')
    })
  })

  describe('Timeline Chart', () => {
    beforeEach(() => {
      cy.get('.dash-btn').contains('Timeline').click()
    })

    it('renders the chart title', () => {
      cy.get('.timeline__header h3').should('contain.text', 'Global Forest Loss')
    })

    it('renders the legend with three items', () => {
      cy.get('.timeline__legend-item').should('have.length', 3)
      cy.get('.timeline__legend-item').eq(0).should('contain.text', 'Forest Loss')
      cy.get('.timeline__legend-item').eq(1).should('contain.text', 'Forest Gain')
      cy.get('.timeline__legend-item').eq(2).should('contain.text', 'Net Loss')
    })

    it('renders the SVG chart', () => {
      cy.get('.timeline__chart svg').should('exist')
      cy.get('.timeline__chart svg path').should('have.length.at.least', 3)
    })
  })

  describe('Map Legend', () => {
    it('renders the deforestation intensity legend', () => {
      cy.get('.dashboard__legend').should('exist')
      cy.get('.dashboard__legend-title').should('contain.text', 'Deforestation Intensity')
    })

    it('shows all legend labels', () => {
      cy.get('.dashboard__legend-labels span').should('have.length', 4)
    })
  })
})
