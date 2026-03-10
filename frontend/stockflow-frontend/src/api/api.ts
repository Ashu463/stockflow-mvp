import axios from "axios"

const api = axios.create({
  baseURL: "https://stockflow-mvp-backend.onrender.com"
})

api.interceptors.request.use((config) => {

  const orgId = localStorage.getItem("orgId")

  if (orgId) {
    config.headers["x-org-id"] = orgId
  }

  return config
})

export default api