import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createNew = async (content) => {
  const object = {content, votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data

}

const update = async (updated) =>{
  const response = await axios.put(`${baseUrl}/${updated.id}`, updated)
  return response.data
}
const anecdotesService = {getAll, createNew, update}

export default anecdotesService