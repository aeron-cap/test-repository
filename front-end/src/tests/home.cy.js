describe("Home Page", () => {
  it("Opens Home Page", () => {
    cy.visit("/");
    cy.contains(`p[class*="chakra-text"]`, "Hello World").should("exist");
  })
})