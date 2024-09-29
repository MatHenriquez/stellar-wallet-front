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
      cy.intercept('GET', '/Transaction/Balance?PublicKey=null&FilterZeroBalances=false&PageNumber=1&PageSize=4', {
        statusCode: 200,
        fixture: 'dashboard/no-balances.json',
      }).as('getNoBalances');
      
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

      cy.intercept('POST', '/Transaction/TestFund', {
        statusCode: 200,
      }).as('getTestBalances');
      
      cy.get('[data-cy=get-test-balances]').trigger('click');
      
      cy.visit('/dashboard');

      cy.intercept('GET', '/Transaction/Balance?PublicKey=null&FilterZeroBalances=false&PageNumber=1&PageSize=4', {
        statusCode: 200,
        fixture: 'dashboard/test-balances.json',
      }).as('getBalances');

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
});
