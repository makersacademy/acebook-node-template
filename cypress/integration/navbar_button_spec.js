describe("Logout+Profile Buttons", () => {
	it("they should not appear on home or signup pages", () => {
		cy.visit("/");
		cy.get(".navbar-button-container").contains("Profile").should("not.exist");
		cy.get(".navbar-button-container").contains("Log Out").should("not.exist");
	});

	it("they should appear otherwise", () => {
		// sign up
		cy.visit("/users/new");
		cy.get("#first-name").type("some");
		cy.get("#last-name").type("one");
		cy.get("#username").type("someone");
		cy.get("#email").type("someone@example.com");
		cy.get("#password").type("password");
		cy.get("#signup").click();

		// sign in
		cy.visit("/");
		cy.get("#email").type("someone@example.com");
		cy.get("#password").type("password");
		cy.get("#login").click();

		cy.get(".navbar-button-container").should("contain", "Profile");
		cy.get(".navbar-button-container").should("contain", "Log Out");
	});
});
