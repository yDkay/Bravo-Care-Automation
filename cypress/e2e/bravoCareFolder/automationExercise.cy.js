/// <reference types="cypress" />

import { uniqueEmail } from "../../support/commands";
// Here we are importing the generated email since we need to create a new one everytime

describe("Test automationexercise website", () => {
  before(() => {
    // We can also use beforeEach() here if we had more Test Cases.
    // 1. Enter the website.
    cy.visit("https://automationexercise.com/");
  });

  it("Test Case 1", () => {
    // 1. Scroll down about halfway down the page;
    cy.get(".features_items")
      .contains("Fancy Green Top")
      .scrollIntoView({ easing: "linear", duration: 750 })
      .should("be.visible");
    // For the first requirement, I can use the following command to scroll exactly to the middle of the page:
    // cy.scrollTo("center");
    // But I find using: scrollIntoView() more suitable to this case while also, verifying it that is it visible;
    // We can also use this selector for the item, since the developers did no add a specific ID to the element:
    // cy.get(".features_items > :nth-child(10)");
    // Following the best practices, (https://docs.cypress.io/guides/references/best-practices) we can see that using contains is "Much better. But still coupled to text content that may change."
    // If we wanted even more randomness we could use the getRandomArbitrary() function in the commands.js file to select between the nth-child(X) values, but we would sacrifice some consistency on the long term.

    // 2. Choose a product and click on “View product” under the picture of the product
    cy.get(
      ":nth-child(10) > .product-image-wrapper > .choose > .nav > li > a"
    ).click();
    // We can also use this selector to add the item directly to the cart:
    // cy.get('[data-product-id="8"]').eq(0).click();
    // If we wanted even more randomness we could use the getRandomArbitrary() function in the commands.js file to select between the data-product-id="X" values, but we would sacrifice some consistency on the long term.

    // 3. In the Quantity box enter 5
    cy.get("#quantity").clear().type(5);
    // In this case we can either type the value or change it directly it's attribute;
    // cy.get("#quantity").invoke("attr", "value", 5).should("have.attr", "value", 5);
    // We could also add randomness to this field by selecting between a wider range of quantities.

    // 4. Click “Add to cart”
    cy.get(".product-information").contains("Add to cart").click();
    // Again we can use another selector for this element since it does not have a specific ID:
    // cy.get(':nth-child(5) > .btn').click();

    // 5. Click “View Cart”
    cy.get(".modal-content").contains("View Cart").click();
    // Again we can use another selector for this element since it does not have a specific ID:
    // cy.get('.modal-body > :nth-child(2)').click();

    // 6. Click on “Proceed to Checkout”
    cy.get("#cart_items").contains("Proceed To Checkout").click();
    // Again we can use another selector for this element since it does not have a specific ID:
    // cy.get('.col-sm-6 > .btn').click();
    // Could now be updated to use proceedToCheckout(); for better maintainability

    // 7. Click on “Register / Login”
    cy.get(".modal-body > :nth-child(2)").click();
    // In this case we can't even use the following contains command since there are more than 1 element with this text in the modal:
    // cy.get(".modal-content").contains("Register / Login").click();

    // 8. Enter name and email under “New User Signup!”
    cy.newSignup("thisName", uniqueEmail);
    // Here we have the first situation where I find it usefull to have a POM Design Pattern (Custom Commands) to create a new account, since this could be used anywhere in the project.
    // We can also create a command that randomizes the credentials, check the commands.js file for this command:
    // cy.newRandSignup();

    // 9. Click on “Signup”
    cy.get('[data-qa="signup-button"]').click();

    // 9. Fill in all information and click on “Create Account” - (This should be the 10th step but there is a typo on the email file).
    cy.newRandInfo();
    // Here we can also create a new command to make the test case more readable.

    // 10. Click on “Continue” under “ACCOUNT CREATED!” title
    cy.get('[data-qa="continue-button"]').click();

    // 11. Click on the Cart in the header
    cy.get(".shop-menu > .nav").contains("Cart").click();
    // Again we can use another selector for this element since it does not have a specific ID:
    // cy.get('.shop-menu > .nav > :nth-child(3)').click();
    // Could now be updated to use cy.clickHeader("Cart"); for better maintainability

    // 12. Click on “Proceed to checkout”
    cy.proceedToCheckout();
    // Since now we are reutilizing this same command we could add it to the commands.js for better maintainability

    // 13. Add a comment and click on “Place Order”
    const uniqueSeed = Date.now().toString();
    const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);
    // Here we have a useful randomizer, we generate a unique seed based on the current time to never repeat the same value.
    cy.get(".form-control").type(getUniqueId());
    cy.get("#cart_items").contains("Place Order").click();
    // Again we can use another selector for this element since it does not have a specific ID:
    // cy.get(':nth-child(7) > .btn').click();

    // 14. Fill in fake Credit Card information and click on “Pay and Confirm Order”
    cy.get('[data-qa="name-on-card"]').type(getUniqueId());
    cy.get('[data-qa="card-number"]').type(getUniqueId());
    cy.get('[data-qa="cvc"]').type(getUniqueId());
    cy.get('[data-qa="expiry-month"]').type(getUniqueId());
    cy.get('[data-qa="expiry-year"]').type(getUniqueId());
    // Since we don't have any restrictions on what we can type, we can reuse the getUniqueId() function, if we had rules, we could use fixtures to use a specific set of approved values or create more random functions that follow the field rules.
    cy.get('[data-qa="pay-button"]').click();

    // 15. Click on “Continue” button
    cy.get('[data-qa="continue-button"]').click();

    // 16. Click on “Logout” on top header
    cy.clickHeader("Logout");
    // Since now we are reutilizing this same command we could add it to the commands.js for better maintainability
    // Again we can use another selector for this element since it does not have a specific ID:
    // cy.get('.shop-menu > .nav > :nth-child(4)').click();

    // 17. On the “Login to your account” box and enter with previously created user
    cy.get('[data-qa="login-email"]').type(uniqueEmail);
    cy.get('[data-qa="login-password"]').type("superSecretPassword", {
      sensitive: true,
    });
    cy.get('[data-qa="login-button"]').click();

    // 18. Click on “Contact us” on the header
    cy.clickHeader("Contact us");
    // Since now we are reutilizing this same command we could add it to the commands.js for better maintainability

    // 19. Fill required data and Click on “Submit”
    cy.get('[data-qa="name"]').type(getUniqueId());
    cy.get('[data-qa="email"]').type(uniqueEmail);
    cy.get('[data-qa="subject"]').type(getUniqueId());
    cy.get('[data-qa="message"]').type(getUniqueId());
    cy.get('[data-qa="submit-button"]').click();

    // 20. Press “OK” in the pop up
    // Seems that the click on the submit button is already confirming the pop up, it is shown in the logs and in the console if printed there as Confirmed: true

    // 21. Finally, click on the “Logout” button on the header
    cy.clickHeader("Logout");
    // Since now we are reutilizing this same command we could add it to the commands.js for better maintainability
    cy.get(".login-form").should("be.visible");
    // Verifying that the page loaded correctly by asserting the visibility of the form
    // We could also verify this by using the cy.incercept (https://docs.cypress.io/api/commands/intercept)
  });
});
