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
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

    
  });
  // it("should edit an interview", () => {
  //   cy.visit("/")
    
  //   // Visits the root of our web server
  //   // Clicks the edit button for the existing appointment
  //   // Changes the name and interviewer
  //   // Clicks the save button
  //   // Sees the edit to the appointment
     
  // });
  // it("should cancel an interview", () => {
  //   cy.visit("/")
    
  //   // Visits the root of our web server
  //   // Clicks the delete button for the existing appointment
  //   // Clicks the confirm button
  //   // Sees that the appointment slot is empty
     
  // });
});