module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  on("task", {
    log(message) {
      console.log(message);
      return null;
    },
  });

  return config;
};
