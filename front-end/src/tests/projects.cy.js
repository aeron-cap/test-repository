/* eslint-disable no-undef */

beforeEach(() => {
    cy.visit("/projects");
  });
  
  describe("Projects Page", () => {
    it("Opens Projects Page", () => {
      cy.contains(`h2[class*="chakra-heading"]`, "Projects").should("exist");
    });
  
    it("Opens Projects Form", () => {
      cy.get(`a[data-test-id="add-projects"]`).should("exist");
      cy.get(`a[data-test-id="add-projects"]`).click();
      cy.get(`form[data-test-id="projects-form"]`).should("exist");
      cy.get(`button[data-test-id="projects-form-cancel"]`).should("exist");
      cy.get(`button[data-test-id="projects-form-submit"]`).should("exist");
    });
  });
  
  describe("Projects Form", () => {
    beforeEach(() => {
      cy.get(`a[data-test-id="add-projects"]`).should("exist");
      cy.get(`a[data-test-id="add-projects"]`).click();
  
      cy.get(`form[data-test-id="projects-form"]`).should("exist");
      cy.get(`button[data-test-id="projects-form-cancel"]`).should("exist");
      cy.get(`button[data-test-id="projects-form-submit"]`).should("exist");
    });
  
    context("Cancel Add Resource", () => {
      it("Cancel Add Resource", () => {
        cy.get('input[name="name"]').type("TEST");
        cy.get(`button[data-test-id="projects-form-cancel"]`).click();
        cy.url().should("include", "/projects");
      });
    });
  
    context("Add Resource", () => {
      beforeEach(() => {
        cy.get('input[name="name"]').type("TEST");
        
      });
  
      it("Fail Type Validation", () => {
        cy.get(`button[data-test-id="projects-form-submit"]`).click();
        cy.contains(
          `div[class*="chakra-form__error-message"]`,
          "Description is required."
        ).should("exist");
        cy.url().should("match", /\/projects\/(add)/);
      });
  
      it("Succeed All Validations", () => {
        cy.get('input[name="description"]').type("TEST DESCRIPTION");
        cy.get(`button[data-test-id="projects-form-submit"]`).click();
  
        cy.contains(
          `h2[class="swal2-title"]`,
          "Resource was added successfully!"
        ).should("exist");
        cy.url().should("match", /\/projects\/(\d+)/);
        cy.contains(
          `button[data-test-id="projects-form-submit"]`,
          "Update Project"
        ).should("exist");
      });
    });
  });
  