describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday").click();
    //has to find the selected item again because it disappears when clicked
    cy.contains("[data-testid=day]", "Tuesday").should(
      "have.class",
      "day-list__item--selected"
    );
  });
});
