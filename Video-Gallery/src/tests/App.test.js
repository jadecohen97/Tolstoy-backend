import React from "react";
import { render, screen } from "@testing-library/react";
import Index from "../index";


test("renders index", () => {
  const { getByText } = render(<Index />);
  const linkElement = getByText(/YOUR VIDEO GALLERY/i);
  expect(linkElement).toBeInTheDocument();
});

// importing errors, test does not work yet...but I will fix it :D 