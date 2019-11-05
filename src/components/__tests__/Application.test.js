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
  getByPlaceholderText
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);
//We want to wait for the fake API request to complete before we confirm that the data has loaded
//We can make our test asynchronous by returning a Promise.

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    // return waitForElement(() => getByText("Monday")).then(() => {
    //   fireEvent.click(getByText("Tuesday"));
    //   expect(getByText("Leopold Silvers")).toBeInTheDocument();
    // });

    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    

    const appointments = getAllByTestId(container, "appointment");
    const appointment = getAllByTestId(container, "appointment")[0];
    //console.log("container", prettyDOM(appointments));
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    //console.log(prettyDOM(container))
    
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    console.log(prettyDOM(day));
  });

  
});

//The last step for this test is to check that the DayListItem component that we are rendering with the text "Monday" also displays the text "no spots remaining".