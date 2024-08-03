describe('Brand', () => {
  describe('Register', () => {
    it('should display brand section', () => {
      cy.visit('http://localhost:3000/auth/signup');
      it('should display brand section', () => {
        cy.get('[data-cy=brand-section]').should('exist');
        cy.get('[data-cy=brand-title]').should('exist').should('have.text', 'Welcome to Crippy!');
        cy.get('[data-cy=brand-subtitle]')
          .should('exist')
          .should('have.text', 'Your Stellar best friend');
      });
    });
  });
  
  describe('Login', () => {
    it('should display brand section', () => {
      cy.visit('http://localhost:3000/auth/login');
      it('should display brand section', () => {
        cy.get('[data-cy=brand-section]').should('exist');
        cy.get('[data-cy=brand-title]').should('exist').should('have.text', 'Welcome to Crippy!');
        cy.get('[data-cy=brand-subtitle]')
          .should('exist')
          .should('have.text', 'Your Stellar best friend');
      });
    });
  });
});
