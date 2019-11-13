import React from "react";
import Blog from "./Blog";

const Blogs = props => {
  const { blogs, onLike, onDelete, user } = props;

  const canShowDeleteButton = blog => {
    return blog.user.username === user.username ? true : false;
  };

  return (
    <React.Fragment>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          onLike={onLike}
          onDelete={onDelete}
          showDelete={canShowDeleteButton(blog)}
        ></Blog>
      ))}
    </React.Fragment>
  );
};

export default Blogs;
