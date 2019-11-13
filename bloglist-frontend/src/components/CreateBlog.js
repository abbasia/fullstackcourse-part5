import React from "react";
import Header from "./Header";

const CreateBlog = props => {
  const { data } = props;
  const { title, author, url, handleCreate } = data;

  return (
    <div>
      <Header text="create new"></Header>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type={title.type}
            value={title.value}
            name="title"
            onChange={title.onChange}
          ></input>
        </div>
        <div>
          author:
          <input
            type={author.type}
            value={author.value}
            name="author"
            onChange={author.onChange}
          ></input>
        </div>
        <div>
          url:
          <input
            type={url.type}
            value={url.value}
            name="url"
            onChange={url.onChange}
          ></input>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
