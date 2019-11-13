import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, onLike, onDelete }) => {
  const [showDetail, setShowDetail] = useState(false);
  const toggleShowDetail = () => setShowDetail(!showDetail);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={blogStyle}>
      <div
        className="clickable"
        onClick={toggleShowDetail}
        style={{ display: showDetail ? "none" : "" }}
      >
        {blog.title} by {blog.author}
      </div>
      <div style={{ display: showDetail ? "" : "none" }} className="detail">
        <div onClick={toggleShowDetail}>title: {blog.title}</div>
        <div>url: {blog.url}</div>
        <div>
          {blog.likes} likes <button onClick={() => onLike(blog)}>like</button>
        </div>
        <div>added by {blog.author}</div>
        <div>
          <button onClick={() => onDelete(blog)}>remove</button>
        </div>
      </div>
    </div>
  );
};
Blog.protoTypes = {
  blog: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
export default Blog;
