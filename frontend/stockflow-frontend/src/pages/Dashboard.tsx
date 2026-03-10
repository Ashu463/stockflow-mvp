import { useEffect,useState } from "react"
import api from "../api/api"

export default function Dashboard(){

  const [data,setData] = useState<any>(null)

  useEffect(()=>{

    const load = async ()=>{

      const res = await api.get("/dashboard")

      setData(res.data)
    }

    load()

  },[])

  if(!data) return <div>Loading...</div>

  return (

    <div>

      <h2>Dashboard</h2>

      <p>Total Products: {data.totalProducts}</p>
      <p>Total Quantity: {data.totalQuantity}</p>

      <h3>Low Stock</h3>

      {data.lowStockItems.map((p:any)=>(
        <div key={p.sku}>
          {p.name} — {p.quantity}
        </div>
      ))}

    </div>

  )
}