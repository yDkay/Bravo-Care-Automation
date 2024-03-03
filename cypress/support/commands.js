// Here we have a useful randomizer, we generate a unique seed based on the current time to never repeat the same value.
const uniqueSeed = Date.now().toString();
const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);
export const uniqueEmail = uniqueSeed + "@email.com";

Cypress.Commands.add("newRandSignup", () => {
  cy.get('[data-qa="signup-name"]').type(getUniqueId());
  cy.get('[data-qa="signup-email"]').type(uniqueEmail);
});

Cypress.Commands.add("newSignup", (name, email) => {
  cy.get('[data-qa="signup-name"]').type(name);
  cy.get('[data-qa="signup-email"]').type(email);
});

// Overwrites the .type() command to allow you to mask sensitive data in the Cypress Command Log.
Cypress.Commands.overwrite("type", (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    // Turn off original log.
    options.log = false;
    // Create our own log with masked message.
    Cypress.log({
      $el: element,
      name: "type",
      message: "*".repeat(text.length),
    });
  }
  return originalFn(element, text, options);
});

Cypress.Commands.add("newRandInfo", () => {
  // Here we can create a new function to get a random number between 2.
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  // Randomize the selector for the genders.
  cy.get("#id_gender" + getRandomArbitrary(1, 3)).check();
  // Here we can use the overwrite function for the type command to mask sensitive data in the Cypress Command Log.
  cy.get('[data-qa="password"]').type("superSecretPassword", {
    sensitive: true,
  });
  // Not set the min value as 0 since it is the placeholder for the Date of Birth field.
  cy.get('[data-qa="days"]').select(getRandomArbitrary(1, 32));
  cy.get('[data-qa="months"]').select(getRandomArbitrary(1, 13));
  cy.get('[data-qa="years"]').select(getRandomArbitrary(1, 122));
  cy.get("#newsletter").check();
  cy.get("#optin").check();
  // Since we don't have any restrictions on what we can type, we can reuse the getUniqueId() function, if we had rules, we could use fixtures to use a specific set of approved values or create more random functions that follow the field rules.
  cy.get('[data-qa="first_name"]').type(getUniqueId());
  cy.get('[data-qa="last_name"]').type(getUniqueId());
  cy.get('[data-qa="company"]').type(getUniqueId());
  cy.get('[data-qa="address"]').type(getUniqueId());
  cy.get('[data-qa="address2"]').type(getUniqueId());
  cy.get('[data-qa="country"]').select(getRandomArbitrary(0, 7));
  cy.get('[data-qa="state"]').type(getUniqueId());
  cy.get('[data-qa="city"]').type(getUniqueId());
  cy.get('[data-qa="zipcode"]').type(getUniqueId());
  cy.get('[data-qa="mobile_number"]').type(getUniqueId());
  cy.get('[data-qa="create-account"]').click();
});

// Since we use this more than once, we can make it a command.
Cypress.Commands.add("proceedToCheckout", () => {
  cy.get("#cart_items").contains("Proceed To Checkout").click();
});

// Since we use this more than once, we can make it a command.
Cypress.Commands.add("clickHeader", (headerValue) => {
  cy.get(".shop-menu > .nav").contains(headerValue).click();
});
