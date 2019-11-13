import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
jest.mock("./services/blogs");
import App from "./App";
import LoginForm from "./components/LoginForm";

import { prettyDOM } from "@testing-library/dom";
const Wrapper = props => {
  const setUsername = event => {
    props.state.username = event.target.value;
  };
  const setPassword = event => {
    props.state.password = event.target.value;
  };
  return (
    <LoginForm
      username={props.state.username}
      password={props.state.password}
      setUsername={setUsername}
      setPassword={setPassword}
      onSubmit={props.onSubmit}
    />
  );
};

describe("<App />", () => {
  test("if no user logged, blogs are not rendered", async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText("login"));
    const form = component.container.querySelector("form");

    expect(form);
  });
});
describe("Login ", () => {
  test("user login", async () => {
    const onSubmit = jest.fn();
    const user = {
      username: "tester",
      token: "1231231214",
      name: "Donald Tester",
      password: "1234"
    };

    localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

    const state = { username: "", password: "" };
    const component = render(
      <Wrapper onSubmit={onSubmit} state={state}></Wrapper>
    );
    console.log(prettyDOM(component.container));
    const usernameInput = component.container.querySelector(".username");
    const passwordInput = component.container.querySelector(".password");
    const form = component.container.querySelector("form");
    console.log(prettyDOM(usernameInput));
    console.log(prettyDOM(passwordInput));

    //fireEvent.change(usernameInput, { target: { value: "tester" } });
    //fireEvent.change(passwordInput, { target: { value: "1234" } });
    //fireEvent.submit(form);
  });
});
