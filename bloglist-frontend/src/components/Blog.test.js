import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";
import { exec } from "child_process";
import { executionAsyncId } from "async_hooks";

test("renders content", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "the one who is testing",
    likes: 2
  };

  const mockHandler = jest.fn();
  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent(
    `${blog.title} by ${blog.author}`
  );
  const clickable = component.container.querySelector(".clickable");
  const detail = component.container.querySelector(".detail");
  expect(clickable).toBeVisible();
  expect(detail).not.toBeVisible();
  fireEvent.click(clickable);
  expect(clickable).not.toBeVisible();
  expect(detail).toBeVisible();
});
