export default (on: Cypress.PluginEvents) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
  on('task', require('@cypress/code-coverage/task'));
};
