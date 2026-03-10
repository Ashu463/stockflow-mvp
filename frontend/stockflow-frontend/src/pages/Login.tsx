import { useState } from "react"
import api from "../api/api"
import { useNavigate, Link } from "react-router-dom"

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

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form onSubmit={login} className="bg-white p-8 rounded shadow w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Email"
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input
          className="w-full border p-2 mb-4 rounded"
          type="password"
          placeholder="Password"
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>

        <p className="text-center mt-4">
          No account?
          <Link to="/signup" className="text-blue-600 ml-1">
            Signup
          </Link>
        </p>

      </form>

    </div>

  )
}