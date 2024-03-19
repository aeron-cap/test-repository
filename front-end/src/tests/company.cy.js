/* eslint-disable no-undef */

beforeEach(() => {
    cy.visit("/companies");
  });
  
  describe("Companies Page", () => {
    it("Opens Companies Page", () => {
      cy.contains(`h2[class*="chakra-heading"]`, "Company").should("exist");
    });
  
    it("Opens Companies Form", () => {
      cy.get(`a[data-test-id="add-company"]`).should("exist");
      cy.get(`a[data-test-id="add-company"]`).click();
      cy.get(`form[data-test-id="company-form"]`).should("exist");
      cy.get(`button[data-test-id="company-form-cancel"]`).should("exist");
      cy.get(`button[data-test-id="company-form-submit"]`).should("exist");
    });
  });
  
  describe("Companies Form", () => {
    beforeEach(() => {
      cy.get(`a[data-test-id="add-company"]`).should("exist");
      cy.get(`a[data-test-id="add-company"]`).click();
  
      cy.get(`form[data-test-id="company-form"]`).should("exist");
      cy.get(`button[data-test-id="company-form-cancel"]`).should("exist");
      cy.get(`button[data-test-id="company-form-submit"]`).should("exist");
    });
  
    context("Cancel Add Company", () => {
      it("Cancel Add Company", () => {
        cy.get('input[name="name"]').type("Intel Inc.");
        cy.get(`button[data-test-id="company-form-cancel"]`).click();
        cy.url().should("include", "/companies");
      });
    });
  
    context("Add Company", () => {
      beforeEach(() => {
        cy.get('input[name="name"]').type("Intel Inc");
        cy.get('input[name="contactPerson"]').type("Patrick");

        cy.get('input[name="address"]').type("USA");
        cy.get('input[name="contactNumber"]').type("09090909090");
      });
  
      it("Fail Email Validation", () => {
        cy.get(`button[data-test-id="company-form-submit"]`).click();
        cy.contains(
          `div[class*="chakra-form__error-message"]`,
          "Enter proper format"
        ).should("exist");
        cy.url().should("match", /\/companies\/(add)/);
      });
  
      it("Succeed All Validations", () => {
        cy.get('input[name="email"]').type("intel@intel.com");
        cy.get(`button[data-test-id="company-form-submit"]`).click();
  
        cy.contains(
          `h2[class="swal2-title"]`,
          "Company was added successfully!"
        ).should("exist");
        cy.url().should("match", /\/companies\/(\d+)/);
        cy.contains(
          `button[data-test-id="company-form-submit"]`,
          "Update Company"
        ).should("exist");
      });
    });
  });
  