import axios from 'axios'

const requests = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const create = async data => {
  try {
    const response = await requests.post('clients', data)
    return response.data
  } catch (error) {
    if (error.response) return error.response.data
  }
}

const update = async (data, id) => {
  try {
    const response = await requests.put(`clients/${id}`, data)
    return response.data
  } catch (error) {
    if (error.response) return error.response.data
  }
}

const getAll = async () => {
  try {
    const response = await requests.get('clients')
    return response.data
  } catch (error) {
    if (error.response) return error.response.data
  }
}

const remove = async id => {
  try {
    const response = await requests.delete(`clients/${id}`)
    return response.data
  } catch (error) {
    if (error.response) return error.response.data
  }
}

export default {
  create,
  update,
  getAll,
  remove,
}
