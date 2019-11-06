import React from "react";
import { render, cleanup, fireEvent, prettyDOM } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    //This is mock data
    {
      id: 1,
      name: "Sylvia Pamler",
      avatar: "http://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    const { getByText } = render(
      <Form
        interviewers={interviewers}
        onSave={onSave}
        name=""
        interviewer={interviewers.id}
      />
    );
    fireEvent.click(getByText("Save"));
    expect(
      getByText(/You must enter a name AND select an interviewer!/i)
    ).toBeInTheDocument();
    
    expect(onSave).not.toHaveBeenCalled();
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const {
      container,
      getByText,
      getByPlaceholderText,
      queryByText,
      queryByAltText
    } = render(<Form interviewers={interviewers} onSave={onSave} />);

    fireEvent.click(getByText("Save"));

    expect(
      getByText(/You must enter a name AND select an interviewer!/i)
    ).toBeInTheDocument();

    expect(onSave).not.toHaveBeenCalled();

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(queryByAltText("Sylvia Pamler"));

    fireEvent.click(getByText("Save"));

    expect(
      queryByText(/You must enter a name AND select an interviewer!/i)
    ).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);

    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1, undefined);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const {
      getByText,
      getByPlaceholderText,
      queryByText,
      queryByAltText
    } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Miller-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );

    fireEvent.click(queryByAltText("Sylvia Pamler"));

    fireEvent.click(getByText("Save"));

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByText("Cancel"));
    
    expect(
      queryByText(/You must enter a name AND select an interviewer!/i)
    ).toBeNull();

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
