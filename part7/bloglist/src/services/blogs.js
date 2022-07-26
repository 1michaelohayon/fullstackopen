import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(
    `${baseUrl}/${newObject.id}`,
    newObject,
    config
  )
  return response.data
}

const remove = async (object) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(config)
  console.log(`${baseUrl}/${object.id}`)
  const response = await axios.delete(`${baseUrl}/${object.id}`, config)
  return response.data
}

const blogsService = {
  setToken,
  getAll,
  create,
  update,
  remove,
}
export default blogsService
