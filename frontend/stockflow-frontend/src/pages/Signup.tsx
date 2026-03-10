import { useState } from "react"
import api from "../api/api"
import { useNavigate, Link } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function Signup() {

  const navigate = useNavigate()

  const [form,setForm] = useState({
    email:"",
    password:"",
    organizationName:""
  })

  const signup = async (e:any)=>{

    e.preventDefault()

    const res = await api.post("/auth/signup",form)

    const token = res.data.token
    const payload = JSON.parse(atob(token.split(".")[1]))

    localStorage.setItem("token",token)
    localStorage.setItem("orgId",payload.orgId)

    navigate("/dashboard")
  }

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar minimal={true} />

      <div className="flex items-center justify-center mt-20">

        <form onSubmit={signup} className="bg-white p-8 rounded shadow w-96">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Create Account
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

          <input
            className="w-full border p-2 mb-4 rounded"
            placeholder="Organization Name"
            onChange={(e)=>setForm({...form,organizationName:e.target.value})}
          />

          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Signup
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?
            <Link to="/" className="text-blue-600 ml-1">
              Login
            </Link>
          </p>

        </form>

      </div>

    </div>

  )
}