export function signUp() {
  cy.visit("/users/new");
  cy.get("#email").type("someone@example.com");
  cy.get("#password").type("password");
  cy.get("#submit").click();
}

export function signIn() {
  cy.visit("/sessions/new");
  cy.get("#email").type("someone@example.com");
  cy.get("#password").type("password");
  cy.get("#submit").click();
}

export function submitPost() {
  cy.visit("/posts");
  cy.contains("New post").click();
  cy.get("#new-post-form")
    .find('[type="text"]')
    .type("Example Post from Cypress Testing");
  cy.get("#new-post-form").submit();
}
