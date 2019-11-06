describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  //find text that contains Tuesday and click on it
  it("should navigate to Tuesday", () => {
    cy.visit("/")
    .contains("[data-testid=day]", "Tuesday")
    .click()
    //has to find the selected item again because it disappears when clicked
    cy.contains("[data-testid=day]", "Tuesday")
    .should("have.class", "day-list__item--selected")
  });
});