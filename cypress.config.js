const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    //I like saving files without running the tests.
    watchForFileChanges: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
  },
  reporter: "mochawesome",
  reporterOptions: {
    overwrite: true,
    html: true,
    json: true,
    autoOpen: true,
  },
});
