/* eslint-disable no-undef */

beforeEach(() => {
    cy.visit("/requests");
  });
  
  describe("Requests Page", () => {
    it("Opens Requests Page", () => {
      cy.contains(`h2[class*="chakra-heading"]`, "Requests").should("exist");
    });
  
    it("Opens Requests Form", () => {
      cy.get(`a[data-test-id="add-requests"]`).should("exist");
      cy.get(`a[data-test-id="add-requests"]`).click();
      cy.get(`form[data-test-id="requests-form"]`).should("exist");
      cy.get(`button[data-test-id="requests-form-cancel"]`).should("exist");
      cy.get(`button[data-test-id="requests-form-submit"]`).should("exist");
    });
  });
  
  describe("Requests Form", () => {
    beforeEach(() => {
      cy.get(`a[data-test-id="add-requests"]`).should("exist");
      cy.get(`a[data-test-id="add-requests"]`).click();
  
      cy.get(`form[data-test-id="requests-form"]`).should("exist");
      cy.get(`button[data-test-id="requests-form-cancel"]`).should("exist");
      cy.get(`button[data-test-id="requests-form-submit"]`).should("exist");
    });
  
    context("Cancel Add Request", () => {
      it("Cancel Add Request", () => {
        cy.get('input[name="client"]').type("TEST");
        cy.get(`button[data-test-id="requests-form-cancel"]`).click();
        cy.url().should("include", "/requests");
      });
    });
  
    context("Add Request", () => {
      beforeEach(() => {
        cy.get('input[name="client"]').type("TEST");
        cy.get('input[name="project"]').type("TEST");
        
      });
  
      it("Fail Type Validation", () => {
        cy.get(`button[data-test-id="requests-form-submit"]`).click();
        cy.contains(
          `div[class*="chakra-form__error-message"]`,
          "Subject is Required"
        ).should("exist");
        cy.url().should("match", /\/requests\/(add)/);
      });
  
      it("Succeed All Validations", () => {
        cy.get('input[name="subject"]').type("TEST SUBJECT");
        cy.get(`button[data-test-id="requests-form-submit"]`).click();
  
        cy.contains(
          `h2[class="swal2-title"]`,
          "Request was added successfully!"
        ).should("exist");
        cy.url().should("match", /\/requests\/(\d+)/);
        cy.contains(
          `button[data-test-id="requests-form-submit"]`,
          "Update Request"
        ).should("exist");
      });
    });
  });
  