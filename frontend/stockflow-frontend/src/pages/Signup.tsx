import { useState } from "react"
import api from "../api/api"
import { useNavigate } from "react-router-dom"

export default function Signup() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: "",
    organizationName: "",
  })

  const handleSubmit = async (e:any) => {
    e.preventDefault()

    const res = await api.post("/auth/signup", form)

    const token = res.data.token
    const payload = JSON.parse(atob(token.split(".")[1]))

    localStorage.setItem("token", token)
    localStorage.setItem("orgId", payload.orgId)

    navigate("/dashboard")
  }

  return (
    <div>
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <input
          placeholder="Organization"
          onChange={(e)=>setForm({...form,organizationName:e.target.value})}
        />

        <button>Signup</button>
      </form>
    </div>
  )
}