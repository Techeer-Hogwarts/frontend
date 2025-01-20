import axios from 'axios'

const API_BASE_URL = 'https://api.techeerzip.cloud/api/v1'
// const API_BASE_URL = 'http://localhost:8000/api/v1'

export const baseInstance = axios.create({
  baseURL: API_BASE_URL,
})
