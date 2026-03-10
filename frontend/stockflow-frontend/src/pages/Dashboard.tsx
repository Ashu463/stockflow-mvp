import { useEffect, useState } from "react"
import api from "../api/api"
import Navbar from "../components/Navbar"

export default function Dashboard(){

  const [data,setData] = useState<any>(null)

  useEffect(()=>{
    load()
  },[])

  const load = async ()=>{

    const res = await api.get("/dashboard")

    setData(res.data)

  }

  if(!data) return <p>Loading...</p>

  return(

    <div className="bg-gray-100 min-h-screen">

      <Navbar/>

      <div className="max-w-6xl mx-auto p-6">

        <div className="flex justify-between mb-6">

          <h1 className="text-2xl font-bold">Dashboard</h1>

        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">

          <div className="bg-white shadow p-6 rounded">

            <p className="text-gray-500">Total Products</p>
            <h2 className="text-3xl">{data.totalProducts}</h2>

          </div>

          <div className="bg-white shadow p-6 rounded">

            <p className="text-gray-500">Total Quantity</p>
            <h2 className="text-3xl">{data.totalQuantity}</h2>

          </div>

        </div>

        {/* All Products */}

        <div className="bg-white shadow rounded p-6 mb-6">

          <h2 className="text-xl mb-4">All Products</h2>

          <table className="w-full">

            <thead>

              <tr className="text-left border-b">

                <th className="p-2">Name</th>
                <th className="p-2">Organization</th>
                <th className="p-2">Quantity</th>

              </tr>

            </thead>

            <tbody>

              {data.products.map((p:any)=>(

                <tr key={p.id} className="border-b">

                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.organization.name}</td>

                  <td className={`p-2 ${p.quantity <= 5 ? "text-red-600 font-semibold":""}`}>
                    {p.quantity}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Low Stock */}

        <div className="bg-white shadow rounded p-6">

          <h2 className="text-xl mb-4">Low Stock Items</h2>

          {data.lowStockItems.length === 0 && (
            <p>No low stock items</p>
          )}

          {data.lowStockItems.map((p:any)=>(

            <div key={p.id} className="flex justify-between border-b py-2">

              <span>{p.name}</span>
              <span className="text-red-600">{p.quantity}</span>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}