import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import SimpleBlog from "./SimpleBlog";

test("renders content", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "the one who is testing",
    likes: 2
  };

  const mockHandler = jest.fn();
  const component = render(<SimpleBlog blog={blog} onClick={mockHandler} />);

  expect(
    component.container.querySelector(".title-and-author")
  ).toHaveTextContent("Component testing is done with react-testing-library");
  expect(
    component.container.querySelector(".title-and-author")
  ).toHaveTextContent("the one who is testing");
  expect(component.container.querySelector(".likes")).toHaveTextContent(
    "2 likes"
  );
  const button = component.getByText("like");
  fireEvent.click(button);
  fireEvent.click(button);
  expect(mockHandler.mock.calls.length).toBe(2);
});
