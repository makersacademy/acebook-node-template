const { defineConfig } = require("cypress");

module.exports = defineConfig({
    component: {
      devServer: {
        framework: "node"
      },
    },
    e2e: {
        baseUrl: "http://localhost:3000"}})