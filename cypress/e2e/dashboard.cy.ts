describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/dashboard');

    cy.intercept(
      'GET',
      '/Transaction/Balance?PublicKey=null&FilterZeroBalances=false&PageNumber=1&PageSize=4',
      {
        statusCode: 200,
        body: {
          balances: [
            {
              asset: 'BTC',
              amount: '0.0000000',
            },
            {
              asset: 'ETH',
              amount: '0.0002000',
            },
          ],
          totalPages: 1,
        },
      },
    ).as('getBalances');
  });

  describe('Balances', () => {
    it('should display the balances section', () => {
      cy.get('[data-cy=balances-section]').should('exist');
    });

    it('should display the title', () => {
      cy.get('[data-cy=balances-title]').should('exist').should('have.text', 'Balances');
    });

    it('should display the filter balances checkbox', () => {
      cy.get('[data-cy=filter-balances]').should('exist');
    });

    it('should display the pagination', () => {
      cy.get('[data-cy=balances-pagination]').should('exist');
    });

    it('should display the balances', () => {
        cy.wait('@getBalances');
        cy.wait(5000);
        cy.get('[data-cy=balance-card-btc]').should('exist');
        cy.get('[data-cy=balance-card-eth]').should('exist');
    });
  });

  describe('Filter balances', () => {
    it('should filter balances in zero', () => {
      cy.intercept(
        'GET',
        '/Transaction/Balance?PublicKey=null&FilterZeroBalances=true&PageNumber=1&PageSize=4',
        {
          statusCode: 200,
          body: {
            balances: [
              {
                asset: 'ETH',
                amount: '0.0002000',
              },
            ],
            totalPages: 1,
          },
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
