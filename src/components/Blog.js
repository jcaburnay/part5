import { useState } from 'react'

const Blog = ({ blog, handleClick }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('view')

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    buttonLabel === 'view' ? setButtonLabel('hide') : setButtonLabel('view')
  }
  

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleVisibility}>{buttonLabel}</button>
      <div style={showWhenVisible}>
        <p>Author: {blog.author}</p>
        <p>Blog Url: {blog.url}</p>
        <p>likes: {blog.likes} <button onClick={handleClick}>like</button></p>
      </div>
    </div>  
  )
  }

export default Blog