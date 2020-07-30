// https://docs.cypress.io/api/introduction/api.html

describe("Test main page filter", () => {
  it("check date", () => {
    cy.visit("http://localhost:8080");
    cy.get('#dateInput')
    .type('2020-07-24')
    .should('have.value', '2020-07-24')
  });
});
