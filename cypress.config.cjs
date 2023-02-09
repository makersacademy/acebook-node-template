// eslint-disable-next-line node/no-unpublished-require
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "node",
    },
  },
  e2e: {
    baseUrl: "http://localhost:3030",
  },
});
