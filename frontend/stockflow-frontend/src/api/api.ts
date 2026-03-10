import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000",
})

api.interceptors.request.use((config) => {
  const orgId = localStorage.getItem("orgId")

  if (orgId) {
    config.headers["x-org-id"] = orgId
  }

  return config
})

export default api