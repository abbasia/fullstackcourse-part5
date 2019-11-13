import React, { useState, useEffect } from "react";

import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import Header from "./components/Header";
import LoggedIn from "./components/LoggedIn";
import CreateBlog from "./components/CreateBlog";
import Togglable from "./components/Togglable";

import loginService from "./services/login";
import blogService from "./services/blogs";
import { useField } from "./hooks";
function App() {
  const [blogs, setBlogs] = useState([]);
  const [sortedBlogs, setSortedBlogs] = useState([]);
  const username = useField("text");
  const password = useField("password");

  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    error: false
  });

  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    fetchBlogs();
  }, [user]);
  useEffect(() => {
    const sorted = blogs.sort((a, b) => b.likes - a.likes);
    setSortedBlogs(sorted);
  }, [blogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showNotificaiton = n => {
    setNotification(n);

    setTimeout(() => {
      setNotification({ message: null, error: false });
    }, 5000);
  };
  const handleDelete = async blog => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      console.log("delete confirmed");
      try {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter(b => b.id !== blog.id));
        showNotificaiton({
          message: "blog deleted successfully",
          error: false
        });
      } catch (error) {
        showNotificaiton({ message: "Error deleting blog", error: true });
      }
    }
  };
  const handleLike = async blog => {
    const newObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    };

    try {
      const newBlog = await blogService.update(blog.id, newObject);
      setBlogs(
        blogs.map(blog => {
          return blog.id === newBlog.id ? newBlog : blog;
        })
      );

      showNotificaiton({ message: "like added to blog", error: false });
    } catch (error) {
      showNotificaiton({ message: "Error adding likes", error: true });
    }
  };
  const handleCreate = async event => {
    event.preventDefault();
    try {
      const data = { title: title.value, author: author.value, url: url.value };
      const blog = await blogService.create(data);
      setBlogs([...blogs, blog]);
      showNotificaiton({
        message: `a new blog ${blog.title} by ${blog.author} added`,
        error: false
      });
      title.reset();
      author.reset();
      url.reset();
    } catch (error) {
      showNotificaiton({ message: "Error creating new blog", error: true });
    }
  };
  const createBlogInputs = {
    title,
    author,
    url,
    handleCreate
  };
  const handleLogout = event => {
    event.preventDefault();
    setUser(null);
    window.localStorage.removeItem("loggedBlogUser");
    blogService.setToken(null);
  };
  const handleLogin = async event => {
    event.preventDefault();

    const credentials = { username: username.value, password: password.value };
    try {
      const user = await loginService.login(credentials);
      console.log("user", user);
      setUser(user);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      username.reset();
      password.reset();
    } catch (exception) {
      console.log(exception);
      showNotificaiton({ message: "Wrong username or password", error: true });
    }
  };

  return (
    <div className="App">
      {notification.message && (
        <Notification notification={notification}></Notification>
      )}
      {!user && (
        <LoginForm
          onSubmit={handleLogin}
          username={username}
          password={password}
        ></LoginForm>
      )}
      {user && (
        <div>
          <Header text="blogs"></Header>
          <LoggedIn user={user} onClick={handleLogout}></LoggedIn>
          <br></br>
          <Togglable buttonLabel="new blog">
            <CreateBlog data={createBlogInputs}></CreateBlog>
          </Togglable>
          <br></br>
          <Blogs
            blogs={sortedBlogs}
            onLike={handleLike}
            onDelete={handleDelete}
            user={user}
          ></Blogs>
        </div>
      )}
    </div>
  );
}

export default App;
