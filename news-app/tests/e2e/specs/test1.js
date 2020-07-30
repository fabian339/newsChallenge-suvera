// https://docs.cypress.io/api/introduction/api.html

describe("Test main page", () => {
  it("check topics", () => {
    cy.visit("http://localhost:8080");
    cy.get('#topicInput')
    .type('nba')
    .should('have.value', 'nba')
  });
});
