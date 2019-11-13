import React from "react";

const LoggedIn = props => {
  const { user, onClick } = props;
  return (
    <div>
      {user.name} logged in <button onClick={onClick}>logout</button>
    </div>
  );
};

export default LoggedIn;
