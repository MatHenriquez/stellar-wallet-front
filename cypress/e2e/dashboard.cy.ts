describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/dashboard');

    cy.intercept(
      'GET',
      '/Transaction/Balance?PublicKey=null&FilterZeroBalances=false&PageNumber=1&PageSize=4',
      {
        statusCode: 200,
        fixture: 'dashboard/balances.json',
      },
    ).as('getBalances');

    cy.intercept('GET', '/Auth/UserToken', {
      statusCode: 200,
      fixture: 'dashboard/auth-token.json',
    }).as('getUserToken');
  });

  describe('Balances', () => {
    it('should display the balances section', () => {
      cy.get('[data-cy=balances-section]').should('exist');
    });

    it('should display the title', () => {
      cy.get('[data-cy=balances-title]').should('exist').should('have.text', 'Balances');
    });

    it('should display the filter balances checkbox', () => {
      cy.wait('@getBalances');
      cy.get('[data-cy=filter-balances]').should('exist');
    });

    it('should display the pagination', () => {
      cy.get('[data-cy=balances-pagination]').should('exist');
    });

    it('should display the footer', () => {
      cy.get('[data-cy=footer]').should('exist');
    });

    it('should display the balances', () => {
      cy.wait('@getBalances');
      cy.get('[data-cy=balance-card-btc]').should('exist');
      cy.get('[data-cy=balance-card-eth]').should('exist');
    });

    it('should display the no balances message', () => {
      cy.intercept(
        'GET',
        '/Transaction/Balance?PublicKey=null&FilterZeroBalances=false&PageNumber=1&PageSize=4',
        {
          statusCode: 200,
          fixture: 'dashboard/no-balances.json',
        },
      ).as('getNoBalances');

      cy.wait('@getNoBalances');
      cy.get('[data-cy=no-balances-message]')
        .should('exist')
        .should('have.text', "You don't have any balance yet.");
    });

    it('should display the get test balances button', () => {
      cy.intercept(
        'GET',
        '/Transaction/Balance?PublicKey=null&FilterZeroBalances=false&PageNumber=1&PageSize=4',
        {
          statusCode: 200,
          fixture: 'dashboard/no-balances.json',
        },
      ).as('getNoBalances');

      cy.get('[data-cy=get-test-balances]').should('exist');
    });

    it.only('should get test balances', () => {
      cy.intercept(
        'GET',
        '/Transaction/Balance?PublicKey=null&FilterZeroBalances=false&PageNumber=1&PageSize=4',
        {
          statusCode: 200,
          fixture: 'dashboard/no-balances.json',
        },
      ).as('getNoBalances');

      cy.wait('@getNoBalances');

      cy.intercept('POST', '/Transaction/TestFund', {
        statusCode: 200,
      }).as('getTestBalances');

      cy.get('[data-cy=get-test-balances]').trigger('click');
      cy.wait('@getTestBalances');

      cy.intercept(
        'GET',
        '/Transaction/Balance?PublicKey=null&FilterZeroBalances=false&PageNumber=1&PageSize=4',
        {
          statusCode: 200,
          fixture: 'dashboard/test-balances.json',
        },
      ).as('getBalances');

      cy.visit('/dashboard');

      cy.wait('@getBalances');

      cy.get('[data-cy=balance-card-xlm]').should('exist');
    });

    it('should not display the pagination is there are no balances', () => {
      cy.intercept(
        'GET',
        '/Transaction/Balance?PublicKey=null&FilterZeroBalances=false&PageNumber=1&PageSize=4',
        {
          statusCode: 200,
          fixture: 'dashboard/no-balances.json',
        },
      ).as('getNoBalances');

      cy.wait('@getNoBalances');
      cy.get('[data-cy=balances-pagination]').should('not.exist');
    });
  });

  describe('Filter balances', () => {
    it('should filter balances in zero', () => {
      cy.intercept(
        'GET',
        '/Transaction/Balance?PublicKey=null&FilterZeroBalances=true&PageNumber=1&PageSize=4',
        {
          statusCode: 200,
          fixture: 'dashboard/no-balances.json',
        },
      ).as('getNonZeroBalances');

      cy.get('[data-cy=filter-balances]').check();
      cy.wait('@getNonZeroBalances');
      cy.get('[data-cy=balance-card-btc]').should('not.exist');
    });
  });

  describe('Pagination', () => {
    it('should have a disabled previous button on the first page', () => {
      cy.get('[data-cy=prev-button]').should('be.disabled');
    });

    it('should have an disabled next button on the last page', () => {
      cy.get('[data-cy=next-button]').should('be.disabled');
    });

    it('should display the correct current page and number of pages', () => {
      cy.get('[data-cy=current-page]').should('have.text', 'Page 1 of 1');
    });
  });

  describe('Payment modal', () => {
    it('should display the payment modal', () => {
      cy.get('[data-cy=balance-card-xlm]').within(() => {
        cy.get('[data-cy=send-payment-button]').click();
      });

      cy.get('[data-cy=payment-modal-xlm]').should('exist');
    });

    it('should close the payment modal', () => {
      cy.get('[data-cy=balance-card-xlm]').within(() => {
        cy.get('[data-cy=send-payment-button]').click();
      });

      cy.get('[data-cy=payment-modal-xlm]').within(() => {
        cy.get('[data-cy=close-payment-modal]').click();
      });

      cy.get('[data-cy=payment-modal-xlm]').should('not.exist');
    });

    it('should display the payment form', () => {
      cy.get('[data-cy=balance-card-xlm]').within(() => {
        cy.get('[data-cy=send-payment-button]').click();
      });

      cy.get('[data-cy=payment-modal-xlm]').within(() => {
        cy.get('[data-cy=destination-public-key]').should('exist');
        cy.get('[data-cy=amount]').should('exist');
        cy.get('[data-cy=memo]').should('exist');
        cy.get('[data-cy=send-payment-button]').should('exist');
        cy.get('[data-cy=cancel-payment-button]').should('exist');
      });
    });

    it('should display the payment form errors', () => {
      cy.get('[data-cy=balance-card-xlm]').within(() => {
        cy.get('[data-cy=send-payment-button]').click();
      });

      cy.get('[data-cy=payment-modal-xlm]').within(() => {
        cy.get('[data-cy=send-payment-button]').click();

        cy.get('[data-cy=destination-public-key-error]')
          .should('exist')
          .should('have.text', '*Public key is required');

        cy.get('[data-cy=amount-error]').should('exist').should('have.text', '*Amount is required');

        cy.get('[data-cy=amount]').type('0.0001');
        cy.get('[data-cy=send-payment-button]').click();
        cy.get('[data-cy=amount-error]')
          .should('exist')
          .should('have.text', '*Amount must be greater than 0.001');

        cy.get('[data-cy=memo-error]').should('not.exist');
        cy.get('[data-cy=memo]').type('123456');

        cy.get('[data-cy=send-payment-button]').click();
        cy.get('[data-cy=amount-error]').should('not.exist');
        cy.get('[data-cy=memo-error]').should('not.exist');

        cy.get('[data-cy=destination-public-key]').type(
          'GAHHHBQRSAMEJW365LQ3FU4WDBVHQNFBY45J5RYVG5OTSRSEARRQHLLK',
        );
        cy.get('[data-cy=destination-public-key-error]').should('not.exist');
      });
    });

    it('should send a payment', () => {
      cy.intercept('POST', '/Transaction/Payment', {
        statusCode: 200,
      }).as('sendPayment');

      cy.get('[data-cy=balance-card-xlm]').within(() => {
        cy.get('[data-cy=send-payment-button]').click();
      });

      cy.get('[data-cy=payment-modal-xlm]').within(() => {
        cy.get('[data-cy=destination-public-key]').type(
          'GAHHHBQRSAMEJW365LQ3FU4WDBVHQNFBY45J5RYVG5OTSRSEARRQHLLK',
        );

        cy.get('[data-cy=amount]').type('100');

        cy.get('[data-cy=memo]').type('123456');

        cy.get('[data-cy=send-payment-button]').click();

        cy.wait('@sendPayment');
      });
    });
  });
});
