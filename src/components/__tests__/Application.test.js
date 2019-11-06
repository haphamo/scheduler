import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getByAltText,
  getAllByTestId,
  queryByText,
  queryByAltText,
  getByPlaceholderText
} from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

//We want to wait for the fake API request to complete before we confirm that the data has loaded
//We can make our test asynchronous by returning a Promise.

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //const appointments = getAllByTestId(container, "appointment");
    const appointment = getAllByTestId(container, "appointment")[0];
    //console.log("container", prettyDOM(appointments));
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    //expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    //console.log(prettyDOM(container))

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(queryByAltText(appointment, "Delete"));
    //console.log(prettyDOM(container))
    expect(getByText(appointment, "Delete the Appointment?")).toBeInTheDocument();
    fireEvent.click(queryByText(appointment, "Confirm"));
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, "Add"));
    //console.log(prettyDOM(container));
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    // Render Application
    const { container, debug } = render(<Application />);
    // Wait until the text "Archie Cohen" is displayed. 
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Click the "Edit" button on the selected appointment.
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Edit"));

    // Updates input or interviewer
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Click save button
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(container, "Could not save appointment"));
    
    fireEvent.click(getByAltText(appointment, "Close"));
    
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();

  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
       // Render Application
       const { container, debug } = render(<Application />);
       // Wait until the text "Archie Cohen" is displayed. 
       await waitForElement(() => getByText(container, "Archie Cohen"));
      // Find the selected appointment
       const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
       // Click the "Delete" button on the selected appointment.
        fireEvent.click(queryByAltText(appointment, "Delete"));
        expect(getByText(appointment, "Delete the Appointment?")).toBeInTheDocument();
        fireEvent.click(queryByText(appointment, "Confirm"));
        expect(getByText(appointment, "Deleting")).toBeInTheDocument();
        await waitForElement(() => getByText(container, "Could not delete appointment"));
        fireEvent.click(getByAltText(appointment, "Close"));
        expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
        //console.log(prettyDOM(appointment))
  });
});

