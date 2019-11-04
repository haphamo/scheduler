import React from "react";
import { render } from "@testing-library/react";
//render funtion allows us to render Componenets

import Application from "components/Application";

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Application />);
  });

});

