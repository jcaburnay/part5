import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

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
      setBlogs(blogs.concat(blog))
    } catch(error) {
      console.log(error)
    }
  }

  if(user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
      <div>
        <h4>
          Create new blog
        </h4>
        <form onSubmit={handleCreate}>
          <div>
            title:
            <input
              type="text"
              value={blogTitle}
              name="title"
              onChange={({ target }) => setBlogTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={blogAuthor}
              name="author"
              onChange={({ target }) => setBlogAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={blogUrl}
              name="url"
              onChange={({ target }) => setBlogUrl(target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
      {
        blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />)
      }
    </div>
  )
}

export default App
