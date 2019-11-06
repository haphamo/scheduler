//We will POST to our /api/debug/reset route to reset the database before each test
describe("Appointments", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should book an interview", () => {
    cy.visit("/")
    /*
    Visits the root of our web server
    Clicks on the "Add" button in the second appointment
    Enters their name
    Chooses an interviewer
    Clicks the save button
    Sees the booked appointment
     */
    
  });
  it("should edit an interview", () => {
    cy.visit("/")
    /*
    Visits the root of our web server
    Clicks the edit button for the existing appointment
    Changes the name and interviewer
    Clicks the save button
    Sees the edit to the appointment
     */
  });
  it("should cancel an interview", () => {
    cy.visit("/")
    /*
    Visits the root of our web server
    Clicks the delete button for the existing appointment
    Clicks the confirm button
    Sees that the appointment slot is empty
     */
  });
});