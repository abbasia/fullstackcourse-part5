import React from "react";

const Notification = props => {
  const { notification } = props;
  return <div>{notification.message}</div>;
};

export default Notification;
