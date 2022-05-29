import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('view')
  const [likes, setLikes] = useState(blog.likes)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    buttonLabel === 'view' ? setButtonLabel('hide') : setButtonLabel('view')
  }
  
  const handleClick = async () => {
    const updatedBlog = await blogService.update({
      ...blog,
      likes: likes + 1
    })
    setLikes(updatedBlog.likes)
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleVisibility}>{buttonLabel}</button>
      <div style={showWhenVisible}>
        <p>Author: {blog.author}</p>
        <p>Blog Url: {blog.url}</p>
        <p>likes: {likes} <button onClick={handleClick}>like</button></p>
      </div>
    </div>  
  )
  }

export default Blog