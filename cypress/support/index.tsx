import '@cypress/code-coverage/support';

after(() => {
  cy.task('coverageReport');
});
