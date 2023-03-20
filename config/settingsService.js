import axios from 'axios'

const API_HOST = process.env.VUE_APP_API_HOST
const PORT = process.env.VUE_APP_PORT
const API = process.env.VUE_APP_API
const settingsService = {
  gateway: axios.create({
    baseURL: `${API_HOST}:${PORT}${API}`
  })
}
export default settingsService
