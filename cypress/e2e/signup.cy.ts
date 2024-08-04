describe('Signup page', () => {
  beforeEach(() => {
    cy.visit('/auth/signup');
  });

  describe('User interface', () => {
    it('should display the signup form', () => {
      cy.get('[data-cy=signup-form]').should('exist');
      cy.get('[data-cy=title]').should('exist');
      cy.get('[data-cy=name-input]').should('exist');
      cy.get('[data-cy=lastName-input]').should('exist');
      cy.get('[data-cy=email-input]').should('exist');
      cy.get('[data-cy=password-input]').should('exist');
      cy.get('[data-cy=confirmPassword-input]').should('exist');
      cy.get('[data-cy=optional-title]').should('exist');
      cy.get('[data-cy=publicKey-input]').should('exist');
      cy.get('[data-cy=secretKey-input]').should('exist');
      cy.get('[data-cy=submit-button]').should('exist');
      cy.get('[data-cy=login-link]').should('exist');
    });

    it('should display the signup form with the correct fields', () => {
      cy.get('[data-cy=name-input]').should('exist');
      cy.get('[data-cy=name-label]').should('contain.text', 'Name:');

      cy.get('[data-cy=lastName-input]').should('exist');
      cy.get('[data-cy=lastName-label]').should('contain.text', 'Surname:');

      cy.get('[data-cy=email-input]').should('exist');
      cy.get('[data-cy=email-label]').should('contain.text', 'Email:');

      cy.get('[data-cy=password-input]').should('exist');
      cy.get('[data-cy=password-label]').should('contain.text', 'Password:');

      cy.get('[data-cy=confirmPassword-input]').should('exist');
      cy.get('[data-cy=confirmPassword-label]').should('contain.text', 'Confirm Password:');

      cy.get('[data-cy=optional-title]').should(
        'contain.text',
        "*Optional",
      );

      cy.get('[data-cy=publicKey-input]').should('exist');
      cy.get('[data-cy=publicKey-label]').should('contain.text', 'Public Key:');

      cy.get('[data-cy=secretKey-input]').should('exist');
      cy.get('[data-cy=secretKey-label]').should('contain.text', 'Secret Key:');
    });
  });

  describe('Form validation', () => {
    describe('Name field', () => {
      it('should display an error message when the name field is empty', () => {
        cy.get('[data-cy=name-input]').focus().blur();
        cy.get('[data-cy=submit-button]').click();
        cy.get('[data-cy=name-error]').should('exist').should('have.text', '*Required');
      });

      it('should not display an error message when the name field is valid', () => {
        cy.get('[data-cy=name-input]').type('John').blur();
        cy.get('[data-cy=name-error]').should('have.text', '');
      });

      it('should display an error message when the name is to short', () => {
        cy.get('[data-cy=name-input]').type('J').blur();
        cy.get('[data-cy=name-error]').should('exist').should('have.text', '*Too Short!');
      });

      it('should display an error message when the name is too long', () => {
        cy.get('[data-cy=name-input]').type('J'.repeat(51)).blur();
        cy.get('[data-cy=name-error]').should('exist').should('have.text', '*Too Long!');
      });

      it('should display an error message when the name contains invalid characters', () => {
        cy.get('[data-cy=name-input]').type('John123').blur();
        cy.get('[data-cy=name-error]').should('exist').should('have.text', '*Invalid name');
      });
    });

    describe('Last name field', () => {
      it('should display an error message when the last name field is empty', () => {
        cy.get('[data-cy=lastName-input]').focus().blur();
        cy.get('[data-cy=submit-button]').click();
        cy.get('[data-cy=lastName-error]').should('exist').should('have.text', '*Required');
      });

      it('should not display an error message when the last name field is touched and then blurred with a value', () => {
        cy.get('[data-cy=lastName-input]').type('Doe').blur();
        cy.get('[data-cy=lastName-error]').should('have.text', '');
      });

      it('should display an error message when the last name is to short', () => {
        cy.get('[data-cy=lastName-input]').type('D').blur();
        cy.get('[data-cy=lastName-error]').should('exist').should('have.text', '*Too Short!');
      });

      it('should display an error message when the last name is too long', () => {
        cy.get('[data-cy=lastName-input]').type('D'.repeat(51)).blur();
        cy.get('[data-cy=lastName-error]').should('exist').should('have.text', '*Too Long!');
      });

      it('should display an error message when the last name contains invalid characters', () => {
        cy.get('[data-cy=lastName-input]').type('Doe123').blur();
        cy.get('[data-cy=lastName-error]').should('exist').should('have.text', '*Invalid lastname');
      });
    });

    describe('Email field', () => {
      it('should display an error message when the email field is empty', () => {
        cy.get('[data-cy=email-input]').focus().blur();
        cy.get('[data-cy=submit-button]').click();
        cy.get('[data-cy=email-error]').should('exist').should('have.text', '*Required');
      });

      it('should not display an error message when the email field is touched and then blurred with a value', () => {
        cy.get('[data-cy=email-input]').type('mail@mail.com').blur();
        cy.get('[data-cy=email-error]').should('have.text', '');
      });

      it('should display an error message when the email is invalid', () => {
        cy.get('[data-cy=email-input]').type('mail.com').blur();
        cy.get('[data-cy=email-error]').should('exist').should('have.text', '*Invalid email');
      });
    });

    describe('Password field', () => {
      it('should display an error message when the password field is empty', () => {
        cy.get('[data-cy=password-input]').focus().blur();
        cy.get('[data-cy=submit-button]').click();
        cy.get('[data-cy=password-error]').should('exist').should('have.text', '*Required');
      });

      it('should not display an error message when the password field is touched and then blurred with a value', () => {
        cy.get('[data-cy=password-input]').type('password12D@').blur();
        cy.get('[data-cy=password-error]').should('have.text', '');
      });

      it('should display an error message when the password is invalid', () => {
        cy.get('[data-cy=password-input]').type('password').blur();
        cy.get('[data-cy=submit-button]').click();
        cy.get('[data-cy=password-error]')
          .should('exist')
          .should('have.text', '*Upper/lowercase, number and special character');
      });

      it('should display an error message when the password is too short', () => {
        cy.get('[data-cy=password-input]').type('P@ssw').blur();
        cy.get('[data-cy=password-error]').should('exist').should('have.text', '*Too Short!');
      });

      it('should display an error message when the password is too long', () => {
        cy.get('[data-cy=password-input]').type('P@ssw'.repeat(100)).blur();
        cy.get('[data-cy=password-error]').should('exist').should('have.text', '*Too Long!');
      });
    });

    describe('Confirm password field', () => {
      it('should display an error message when the confirm password field is empty', () => {
        cy.get('[data-cy=confirmPassword-input]').focus().blur();
        cy.get('[data-cy=submit-button]').click();
        cy.get('[data-cy=confirmPassword-error]').should('exist').should('have.text', '*Required');
      });

      it('should not display an error message when the confirm password field has the same value than the password input', () => {
        cy.get('[data-cy=password-input]').type('myPass123@').blur();
        cy.get('[data-cy=confirmPassword-input]').type('myPass123@').blur();
        cy.get('[data-cy=confirmPassword-error]').should('have.text', '');
      });

      it('should display an error message when the confirm password is invalid', () => {
        cy.get('[data-cy=confirmPassword-input]').type('password').blur();
        cy.get('[data-cy=confirmPassword-error]')
          .should('exist')
          .should('have.text', '*Passwords must match');
      });
    });

    describe('Public key field', () => {
      it('should not display an error message when the public key field is touched and then blurred with a value with 56 characters', () => {
        cy.get('[data-cy=publicKey-input]')
          .type('GDZX2C2A4CMPSACVZNXI63X2CWINPBZDKBPGI2CHNJ4KRLMZHLSD5DGZ')
          .blur();
        cy.get('[data-cy=publicKey-error]').should('have.text', '');
      });

      it('should display an error message when the public key field is touched and then blurred with a value with 55 characters', () => {
        cy.get('[data-cy=publicKey-input]')
          .type('GDZX2C2A4CMPSACVZNXI63X2CWINPBZDKBPGI2CHNJ4KRLMZHLSD5DG')
          .blur();
        cy.get('[data-cy=publicKey-error]').should('exist').should('have.text', '*Too Short!');
      });

      it('should display an error message when the public key field is touched and then blurred with a value with 57 characters', () => {
        cy.get('[data-cy=publicKey-input]')
          .type('GDZX2C2A4CMPSACVZNXI63X2CWINPBZDKBPGI2CHNJ4KRLMZHLSD5DGZD')
          .blur();
        cy.get('[data-cy=publicKey-error]').should('exist').should('have.text', '*Too Long!');
      });
    });

    describe('Secret key field', () => {
      it('should not display an error message when the secret key field is touched and then blurred with a value with 56 characters', () => {
        cy.get('[data-cy=secretKey-input]')
          .type('SDZX2C2A4CMPSACVZNXI63X2CWINPBZDKBPGI2CHNJ4KRLMZHLSD5DGZ')
          .blur();
        cy.get('[data-cy=secretKey-error]').should('have.text', '');
      });

      it('should display an error message when the secret key field is touched and then blurred with a value with 55 characters', () => {
        cy.get('[data-cy=secretKey-input]')
          .type('SDZX2C2A4CMPSACVZNXI63X2CWINPBZDKBPGI2CHNJ4KRLMZHLSD5DG')
          .blur();
        cy.get('[data-cy=secretKey-error]').should('exist').should('have.text', '*Too Short!');
      });

      it('should display an error message when the secret key field is touched and then blurred with a value with 57 characters', () => {
        cy.get('[data-cy=secretKey-input]')
          .type('SDZX2C2A4CMPSACVZNXI63X2CWINPBZDKBPGI2CHNJ4KRLMZHLSD5DGZD')
          .blur();
        cy.get('[data-cy=secretKey-error]').should('exist').should('have.text', '*Too Long!');
      });
    });

    describe('Login link', () => {
      it('should redirect to login page when clicked', () => {
        cy.get('[data-cy=login-link]').click();
        cy.url().should('include', '/auth/login');
      });
    });
  });
});
