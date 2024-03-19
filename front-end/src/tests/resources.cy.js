/* eslint-disable no-undef */

beforeEach(() => {
    cy.visit("/resources");
  });
  
  describe("Resources Page", () => {
    it("Opens Resources Page", () => {
      cy.contains(`h2[class*="chakra-heading"]`, "Resources").should("exist");
    });
  
    it("Opens Resources Form", () => {
      cy.get(`a[data-test-id="add-resource"]`).should("exist");
      cy.get(`a[data-test-id="add-resource"]`).click();
      cy.get(`form[data-test-id="resource-form"]`).should("exist");
      cy.get(`button[data-test-id="resource-form-cancel"]`).should("exist");
      cy.get(`button[data-test-id="resource-form-submit"]`).should("exist");
    });
  });
  
  describe("Resources Form", () => {
    beforeEach(() => {
      cy.get(`a[data-test-id="add-resource"]`).should("exist");
      cy.get(`a[data-test-id="add-resource"]`).click();
  
      cy.get(`form[data-test-id="resource-form"]`).should("exist");
      cy.get(`button[data-test-id="resource-form-cancel"]`).should("exist");
      cy.get(`button[data-test-id="resource-form-submit"]`).should("exist");
    });
  
    context("Cancel Add Resource", () => {
      it("Cancel Add Resource", () => {
        cy.get('input[name="firstName"]').type("Peter");
        cy.get(`button[data-test-id="resource-form-cancel"]`).click();
        cy.url().should("include", "/resources");
      });
    });
  
    context("Add Resource", () => {
      beforeEach(() => {
        cy.get('input[name="firstName"]').type("Peter");
        cy.get('input[name="lastName"]').type("Lee");
      });
  
      it("Fail Type Validation", () => {
        cy.get(`button[data-test-id="resource-form-submit"]`).click();
        cy.contains(
          `div[class*="chakra-form__error-message"]`,
          "Type is required."
        ).should("exist");
        cy.url().should("match", /\/resources\/(add)/);
      });
  
      it("Succeed All Validations", () => {
        cy.get(`#select-resource-type`).select("Project Manager");
        cy.get(`#select-resource-type`).should("have.value", "PM");
        cy.get(`button[data-test-id="resource-form-submit"]`).click();
  
        cy.contains(
          `h2[class="swal2-title"]`,
          "Resource was added successfully!"
        ).should("exist");
        cy.url().should("match", /\/resources\/(\d+)/);
        cy.contains(
          `button[data-test-id="resource-form-submit"]`,
          "Update Resource"
        ).should("exist");
      });
    });
  });
  