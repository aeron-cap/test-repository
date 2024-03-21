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

    context("Delete Resource", () => {
      beforeEach(() => {
        cy.visit("/resources");
      });

      it("Deletes an entry", () => {
        cy.get(`table[data-test-id="resource-table"]`).should("exist");

        //cy.get(`a[class="chakra-linkbox__overlay css-1hnz6hu"]`).should("exist").click();
        cy.contains(`a[class="chakra-linkbox__overlay css-1hnz6hu"]`,
        "JisooChoi").should("exist").click();

        cy.get(`form[data-test-id="resource-form"]`).should("exist");
        cy.get(`form[data-test-id="resource-form"]`).click();
  
        cy.get(`button[data-test-id="delete-resource"]`).should("exist");
        cy.get(`button[data-test-id="delete-resource"]`).click();
  
        cy.contains(
          `h2[class="swal2-title"]`,
          "You are about to delete resource information"
        ).should("exist");

        cy.get(`button[class="swal2-confirm swal2-styled swal2-default-outline"]`).should("exist");
        cy.get(`button[class="swal2-confirm swal2-styled swal2-default-outline"]`).click();

      });

    });

    context("Update Resource", () => {
      beforeEach(() => {
        cy.visit("/resources");
      });

      it("Updates an entry", () => {
        cy.get(`table[data-test-id="resource-table"]`).should("exist");

        cy.contains(`a[class="chakra-linkbox__overlay css-1hnz6hu"]`,
        "Nayeon Santos Im").should("exist").click();

        cy.get(`button[data-test-id="resource-form-submit"]`).should("exist");
        cy.get(`button[data-test-id="resource-form-submit"]`).click();

        cy.get(`#select-resource-type`).select("Project Manager");
        cy.get(`#select-resource-type`).should("have.value", "PM");

        cy.get(`button[data-test-id="resource-form-submit"]`).should("exist");
        cy.get(`button[data-test-id="resource-form-submit"]`).click();

      });
    });
  });