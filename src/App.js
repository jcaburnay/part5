import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { compareLikes } from './util'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      const getBlogs = async () => {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      }
      getBlogs()
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    console.log('login info', username, password)
    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      ) 
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setUsername('')
      setPassword('')
    } catch(error) {
      setErrorMessage('Invalid username or password');
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
      console.log(error)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const handleCreate = async event => {
    event.preventDefault()
    const blogDetails = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    console.log('new blog info', blogDetails)
    try {
      const blog = await blogService.create(blogDetails)
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      setSuccessMessage(`new blog added: ${blog.title} by ${blog.author}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setBlogs(blogs.concat(blog))
    } catch(error) {
      console.log(error)
    }
  }

  const handleClickLike = async (blog) => {
    const updatedBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1
    })
    const newBlogs = blogs.map(blog => {
      if(blog.id === updatedBlog.id) {
        return updatedBlog
      }
      return blog
    })
    newBlogs.sort(compareLikes)
    setBlogs(newBlogs)
  }

  if(user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} notifType="error" />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <div>
        <h4>{user.name} logged in</h4>
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel='new blog'>
        <BlogForm 
          successMessage={successMessage}
          blogTitle={blogTitle}
          blogAuthor={blogAuthor}
          blogUrl={blogUrl}
          handleCreate={handleCreate}
          handleTitleChange={({ target }) => setBlogTitle(target.value)}
          handleAuthorChange={({ target }) => setBlogAuthor(target.value)}
          handleUrlChange={({ target }) => setBlogUrl(target.value)}
        />
      </Togglable>
      {
        blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleClick={() => handleClickLike(blog)}/>)
      }
    </div>
  )
}

export default App
