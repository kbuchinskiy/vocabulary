import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getWords() {
    return apiClient.get(`/words`)
  },
  postWord(word) {
    return apiClient.post(`/words`, word)
  },
  deleteWord(id) {
    return apiClient.delete(`/words/${id}`)
  },
}
