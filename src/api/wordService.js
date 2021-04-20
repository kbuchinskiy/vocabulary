import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:5000/api`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getWords() {
    return apiClient.get(`/word`)
  },
  postWord(word) {
    return apiClient.post(`/word`, word)
  },
  deleteWord(word) {
    return apiClient.delete(`/word/${word.en}`)
  },
}
