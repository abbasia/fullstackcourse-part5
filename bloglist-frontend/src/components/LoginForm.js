import React from "react";
import Header from "./Header";

const LoginForm = props => {
  const { onSubmit, username, password } = props;
  return (
    <div>
      <Header text="log in to application"></Header>
      <form onSubmit={onSubmit} className="form">
        <div>
          username
          <input
            className="username"
            type={username.type}
            value={username.value}
            name="Username"
            onChange={username.onChange}
          ></input>
        </div>
        <div>
          password
          <input
            className="password"
            type={password.type}
            value={password.value}
            name="Password"
            onChange={password.onChange}
          ></input>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
