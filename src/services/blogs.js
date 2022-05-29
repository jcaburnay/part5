import axios from 'axios'
import { compareLikes } from '../util'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { 'Authorization': token },
  }
  const response = await axios.get(baseUrl, config)
  const blogs = response.data
  blogs.sort(compareLikes)
  return blogs
}

const create = async newObject => {
  const config = {
    headers: { 'Authorization': token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (blog) => {
  const config = {
    headers: { 'Authorization': token },
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

export default { getAll, create, update, setToken }