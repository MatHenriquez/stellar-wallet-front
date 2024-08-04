describe('Signup page', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
  });

  describe('Form', () => {
    it('should display the form', () => {
      cy.get('[data-cy=login-form]').should('exist');
    });

    it('should display the title', () => {
      cy.get('[data-cy=title]').should('exist');
    });

    it('should display the email input', () => {
      cy.get('[data-cy=email-input]').should('exist');
    });

    it('should display the password input', () => {
      cy.get('[data-cy=password-input]').should('exist');
    });

    it('should display the submit button', () => {
      cy.get('[data-cy=submit-button]').should('exist');
    });
  });

  describe('Form validation', () => {
    it('should display an error message when email is invalid', () => {
      cy.get('[data-cy=email-input]').type('invalid-email');
      cy.get('[data-cy=submit-button]').click();
      cy.get('[data-cy=email-error]').should('exist').should('have.text', '*Invalid email');
    });

    it('should display an error message when email is empty', () => {
      cy.get('[data-cy=submit-button]').click();
      cy.get('[data-cy=email-error]').should('exist').should('have.text', '*Required');
    });

    it('should display an error message when password is empty', () => {
      cy.get('[data-cy=submit-button]').click();
      cy.get('[data-cy=password-error]').should('exist').should('have.text', '*Required');
    });
  });

  describe('Form submission', () => {
    it('should redirect to home page when form is submitted', () => {
      cy.intercept('POST', '/Auth/Login', {
        statusCode: 200,
        body: {
          success: true,
          token: 'token',
          publicKey: 'publicKey',
        },
      }).as('successfulLogin');
      cy.get('[data-cy=email-input]').type('valid@email.com');
      cy.get('[data-cy=password-input]').type('password');
      cy.get('[data-cy=submit-button]').click();
      cy.wait('@successfulLogin');
      cy.url().should('include', '/home');
    });

    it('should not redirect to home page when form is submitted with invalid credentials', () => {
      cy.intercept('POST', '/Auth/Login', {
        statusCode: 400,
      }).as('failedLogin');
      cy.get('[data-cy=email-input]').type('invalid@email.com');
      cy.get('[data-cy=password-input]').type('password');
      cy.get('[data-cy=submit-button]').click();
      cy.url().should('include', '/auth/login');
    });
  });

  describe('Signup link', () => {
    it('should redirect to signup page when clicked', () => {
      cy.get('[data-cy=signup-link]').click();
      cy.url().should('include', '/auth/signup');
    });
  });
});
