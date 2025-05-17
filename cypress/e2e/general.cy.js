describe("General", () => {
	it("", () => {
		cy.visit('register');

		cy.get('button[title="Create task"]').click();

		cy.get('input[placeholder="Search"]').as("searchbar");
		cy.get("@searchbar").type('1');
		cy.get('div[title="Clear"]').click();
	});
});
