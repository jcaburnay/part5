import PropTypes from 'prop-types'
import { useState } from "react";

const Blog = ({ blog, handleClickLike, handleClickRemove, showDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [visible, setVisible] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("view");

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
    buttonLabel === "view" ? setButtonLabel("hide") : setButtonLabel("view");
  };

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleVisibility}>{buttonLabel}</button>
      <div style={showWhenVisible}>
        <p>Author: {blog.author}</p>
        <p>Blog Url: {blog.url}</p>
        <p>
          likes: {blog.likes} <button onClick={handleClickLike}>like</button>
        </p>
        {showDelete && (
          <div>
            <button onClick={handleClickRemove}>remove</button>
          </div>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired, 
  handleClickLike: PropTypes.func.isRequired, 
  handleClickRemove: PropTypes.func.isRequired, 
  showDelete: PropTypes.bool.isRequired
}

export default Blog;
