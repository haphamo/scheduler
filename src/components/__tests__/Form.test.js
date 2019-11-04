import React from "react";
import { render, cleanup } from "@testing-library/react";
//import { getByPlaceholderText, getByTestId } from "@testing-library/dom"

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [//This is mock data
    {
      id: 1,
      name: "Sylvia Pamler",
      avatar: "http://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />);
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
    <Form interviewers={interviewers} name="Lydia Miller-Jones"/>);
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });
});
