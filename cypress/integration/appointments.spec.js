describe("Appointments", () => {
  beforeEach(() => {//Group common behaviour together
    //Changed the server state, the second time this test runs, it will fail, must rest db to start fresh
    cy.request("GET", "/api/debug/reset")
    cy.visit("/")
      // We can use the built-in retry behaviour of the contains command to verify that the text "Monday" is in the DOM
    cy.contains("Monday")
  })

  it("should book an interview", () => {
    // Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]")
    .first().click()
    //search for the input
    cy.get("[data-testid=student-name-input]")
    // Enters their name
    .type('Lydia Miller-Jones')
    // Chooses an interviewer, watch for brackets!
    cy.get("[alt='Sylvia Palmer']").click()
    // Clicks the save button
    cy.contains("Save").click()
    // Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
    cy.contains(".appointment__card--show", "Sylvia Palmer")

    
  });
  it("should edit an interview", () => {
    // Clicks the edit button for the existing appointment
    cy.get("[alt=Edit]")
    .first()
    .click({ force: true })
    // Changes the name and interviewer
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones")
    cy.get("[alt='Tori Malcolm']").click()
    // Clicks the save button
    cy.contains("Save").click()
    // Sees the edit to the appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
    cy.contains(".appointment__card--show", "Tori Malcolm")
  });
  it("should cancel an interview", () => {
    // Clicks the delete button for the existing appointment
    cy.get("[alt=Delete]")
    .first()
    .click({ force: true })
    // Clicks the confirm button
    cy.contains("Confirm").click()
    //confirm status Deleting by asserting
    cy.contains("Deleting").should("exist")
    //confirm Deleting is complete by asserting it doesn't exist
    cy.contains("Deleting").should("not.exist")
    // Sees that the appointment slot is empty
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist")
  });
});