import { useEffect,useState } from "react"
import api from "../api/api"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function Dashboard(){

  const [data,setData] = useState<any>(null)

  useEffect(()=>{

    const load = async ()=>{

      const res = await api.get("/dashboard")
      setData(res.data)

    }

    load()

  },[])

  if(!data) return <div className="p-10">Loading...</div>

  return (

    <div className="bg-gray-100 min-h-screen">

        <Navbar/>

        <div className="p-10">

        <div className="flex justify-between mb-8">

            <h1 className="text-3xl font-bold">
            Dashboard
            </h1>

            <Link to="/products" className="bg-blue-600 text-white px-4 py-2 rounded">
            Manage Products
            </Link>

        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">

            <div className="bg-white p-6 shadow rounded">
            <p className="text-gray-500">Total Products</p>
            <p className="text-3xl font-bold">{data.totalProducts}</p>
            </div>

            <div className="bg-white p-6 shadow rounded">
            <p className="text-gray-500">Total Quantity</p>
            <p className="text-3xl font-bold">{data.totalQuantity}</p>
            </div>

        </div>

        <div className="bg-white shadow rounded p-6">

            <h2 className="text-xl font-bold mb-4">
            Low Stock Items
            </h2>

            {data.lowStockItems.length === 0 && (
            <p>No low stock items</p>
            )}

            {data.lowStockItems.map((p:any)=>(
            <div key={p.sku} className="border-b py-2">
                {p.name} — {p.quantity}
            </div>
            ))}

        </div>

        </div>
    </div>
  )
}