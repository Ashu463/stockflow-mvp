import { useState } from "react"
import api from "../api/api"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const navigate = useNavigate()

  const [form,setForm] = useState({
    email:"",
    password:""
  })

  const login = async (e:any) => {

    e.preventDefault()

    const res = await api.post("/auth/login",form)

    const token = res.data.token
    const payload = JSON.parse(atob(token.split(".")[1]))

    localStorage.setItem("token",token)
    localStorage.setItem("orgId",payload.orgId)

    navigate("/dashboard")
  }

  return (
    <div>

      <h2>Login</h2>

      <form onSubmit={login}>

        <input
          placeholder="Email"
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <button>Login</button>

      </form>

    </div>
  )
}