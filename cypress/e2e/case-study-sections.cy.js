describe('Case Study Sections', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Problem Section', () => {
    it('renders with correct label and title', () => {
      cy.get('#problem').should('exist')
      cy.get('#problem .section-label').should('contain.text', '01')
      cy.get('#problem .section-title').should('not.be.empty')
    })

    it('shows context and problem statement blocks', () => {
      cy.get('#problem .context-block').should('have.length', 2)
      cy.get('#problem .context-label').first().should('contain.text', 'Context')
      cy.get('#problem .context-label').last().should('contain.text', 'Problem Statement')
    })

    it('displays stat cards', () => {
      cy.get('#problem .stat-card').should('have.length.at.least', 1)
    })

    it('displays design goals', () => {
      cy.get('#problem .sub-title').contains('Design Goals').should('be.visible')
      cy.get('#problem .icon-card').should('have.length.at.least', 1)
    })

    it('displays pain points', () => {
      cy.get('#problem .sub-title').contains('Key Pain Points').should('be.visible')
      cy.get('#problem .pain-item').should('have.length.at.least', 1)
    })
  })

  describe('Research Section', () => {
    it('renders with correct label', () => {
      cy.get('#research').should('exist')
      cy.get('#research .section-label').should('contain.text', '02')
    })

    it('shows target users cards', () => {
      cy.get('#research .sub-title').contains('Target Users').should('exist')
    })

    it('shows pain points cards', () => {
      cy.get('#research .sub-title').contains('Pain Points').should('exist')
    })

    it('renders user personas in a grid layout', () => {
      cy.get('#research .card-grid--wide').should('exist')
      cy.get('#research .persona').should('have.length', 3)
    })

    it('each persona has avatar, name, role, pain, and goal', () => {
      cy.get('#research .persona').first().within(() => {
        cy.get('.persona__avatar').should('not.be.empty')
        cy.get('.persona__name').should('not.be.empty')
        cy.get('.persona__role').should('not.be.empty')
        cy.get('.tag--pain').should('contain.text', 'Pain Point')
        cy.get('.tag--goal').should('contain.text', 'Goal')
      })
    })

    it('shows key insights', () => {
      cy.get('#research .sub-title').contains('Key Insights').should('exist')
      cy.get('#research .insight').should('have.length.at.least', 1)
    })
  })

  describe('UX Strategy Section', () => {
    it('renders with correct label', () => {
      cy.get('#ux-strategy').should('exist')
      cy.get('#ux-strategy .section-label').should('contain.text', '03')
    })

    it('shows core features', () => {
      cy.get('#ux-strategy .sub-title').contains('Core Features').should('exist')
      cy.get('#ux-strategy .icon-card').should('have.length.at.least', 1)
    })

    it('shows user flow steps', () => {
      cy.get('#ux-strategy .sub-title').contains('User Flow').should('exist')
      cy.get('#ux-strategy .flow__step').should('have.length.at.least', 1)
    })

    it('shows advanced patterns with FAANG badge', () => {
      cy.get('#ux-strategy .advanced__badge').should('contain.text', 'FAANG-Level')
      cy.get('#ux-strategy .advanced__item').should('have.length.at.least', 1)
    })
  })

  describe('Impact Section', () => {
    it('renders with correct label', () => {
      cy.get('#impact').should('exist')
      cy.get('#impact .section-label').should('contain.text', '05')
    })

    it('displays metric cards', () => {
      cy.get('#impact .metric').should('have.length', 4)
    })

    it('each metric has value, label, and before/after comparison', () => {
      cy.get('#impact .metric').first().within(() => {
        cy.get('.metric__value').should('not.be.empty')
        cy.get('.metric__label').should('not.be.empty')
        cy.get('.tag--before').should('contain.text', 'Before')
        cy.get('.tag--after').should('contain.text', 'After')
      })
    })

    it('shows the CTA block with tech stack tags', () => {
      cy.get('#impact .cta h3').should('contain.text', 'Built with Purpose')
      cy.get('#impact .cta__tag').should('have.length', 8)
      cy.get('#impact .cta__tag').first().should('contain.text', 'Vue 3')
    })
  })
})
