describe('Transactions page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/Auth/UserToken', {
      statusCode: 200,
      fixture: 'dashboard/auth-token.json',
    }).as('getUserToken');
  });

  describe('Title', () => {
    it('should display the title', () => {
      cy.visit('/transactions');
      cy.get('[data-cy=transactions-title]').should('exist');
    });

    it('should display the title with the correct text', () => {
      cy.visit('/transactions');
      cy.get('[data-cy=transactions-title]').should('have.text', 'Transactions');
    });
  });

  describe('Transactions table', () => {
    beforeEach(() => {
      cy.intercept('GET', '/Transaction/Payment?pageNumber=1&pageSize=5', {
        statusCode: 200,
        fixture: '/transactions/transactions.json',
      }).as('getTransactions');
    });

    it('should display the correct headers', () => {
      const formatDataCy = (text: string) => text.split(' ')[0].toLowerCase() + '-header';
      const amountHeader = formatDataCy('Amount');
      const assetHeader = formatDataCy('Asset');
      const dateAndTimeHeader = formatDataCy('Date and Time');
      const statusHeader = formatDataCy('Status');
      const destinatarySenderHeader = formatDataCy('Destinatary / Sender');

      cy.visit('/transactions');
      cy.get('[data-cy=transactions-table] thead th').should('have.length', 5);
      cy.get(`[data-cy=${amountHeader}]`).should('exist').should('have.text', 'Amount');
      cy.get(`[data-cy=${assetHeader}]`).should('exist').should('have.text', 'Asset');
      cy.get(`[data-cy=${dateAndTimeHeader}]`).should('exist').should('have.text', 'Date and Time');
      cy.get(`[data-cy=${statusHeader}]`).should('exist').should('have.text', 'Status');
      cy.get(`[data-cy=${destinatarySenderHeader}]`)
        .should('exist')
        .should('have.text', 'Destinatary / Sender');

      it('should display the correct number of rows', () => {
        cy.visit('/transactions');
        cy.get('[data-cy=transaction-row]').should('have.length', 5);
      });

      it('should display the correct data in the rows', () => {
        cy.visit('/transactions');
        cy.wait('@getTransactions');
        cy.get('[data-cy=transaction-row0]').should('contain.text', 'ETH');
        cy.get('[data-cy=transaction-row0]').should('contain.text', '+100');
        cy.get('[data-cy=transaction-row0]').should('contain.text', '2021/09/01 00:00:00');
        cy.get('[data-cy=transaction-row0]').should('contain.text', 'Completed');
        cy.get('[data-cy=transaction-row0]').should(
          'contain.text',
          'GCBQNKXVTNMPAJICIZPAOOVZQJPNJUPPN7NUTYO5ZEL73JGI5I3TLRI7',
        );
        cy.get('[data-cy=transaction-row1]').should('contain.text', 'ETH');
        cy.get('[data-cy=transaction-row1]').should('contain.text', '+100');
        cy.get('[data-cy=transaction-row1]').should('contain.text', '2021/09/01 00:00:00');
        cy.get('[data-cy=transaction-row1]').should('contain.text', 'Completed');
        cy.get('[data-cy=transaction-row1]').should(
          'contain.text',
          'GCBQNKXVTNMPAJICIZPAOOVZQJPNJUPPN7NUTYO5ZEL73JGI5I3TLRI7',
        );
      });

      it('should display the correct message if there are no transactions', () => {
        cy.visit('/transactions');
        cy.intercept('GET', '/Transaction/Payment?pageNumber=1&pageSize=5', {
          statusCode: 200,
          fixture: 'no-transactions.json',
        }).as('getEmptyTransactions');

        cy.wait('@getEmptyTransactions');

        cy.get('[data-cy=no-transactions-message]')
          .should('exist')
          .should('have.text', 'No transactions found.');
      });
    });
  });

  describe('Pagination', () => {
    beforeEach(() => {
      cy.intercept('GET', '/Transaction/Payment?pageNumber=1&pageSize=5', {
        statusCode: 200,
        fixture: '/transactions/transactions.json',
      }).as('getTransactions');
    });

    it('should display the pagination component', () => {
      cy.visit('/transactions');
      cy.get('[data-cy=pagination]').should('exist');
    });

    it('should display the previous page button', () => {
      cy.visit('/transactions');
      cy.get('[data-cy=previous-page-button]').should('exist');
    });

    it('should display the next page button', () => {
      cy.visit('/transactions');
      cy.get('[data-cy=next-page-button]').should('exist');
    });

    it('should display the correct number of page buttons', () => {
      cy.visit('/transactions');
      cy.get('[data-cy=page-button-1]').should('exist');
    });
  });
});
