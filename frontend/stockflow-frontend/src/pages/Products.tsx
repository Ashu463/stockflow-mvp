import { useEffect,useState } from "react"
import api from "../api/api"
import Navbar
 from "../components/Navbar"
export default function Products(){

  const [products,setProducts] = useState<any[]>([])
  const [name,setName] = useState("")
  const [sku,setSku] = useState("")
  const [quantity,setQuantity] = useState(0)

  const load = async ()=>{

    const res = await api.get("/products")
    setProducts(res.data)

  }

  useEffect(()=>{ load() },[])

  const create = async ()=>{

    await api.post("/products",{ name, sku, quantity })
    load()

  }

  const remove = async (id:string)=>{

    await api.delete(`/products/${id}`)
    load()

  }

  return(
    <div className="bg-gray-100 min-h-screen">
    
            <Navbar/>

        <div className="p-10">

        <h1 className="text-3xl font-bold mb-6">
            Products
        </h1>

        <div className="bg-white p-6 rounded shadow mb-8">

            <h2 className="font-bold mb-4">Add Product</h2>

            <div className="flex gap-4">

            <input
                className="border p-2 rounded"
                placeholder="Name"
                onChange={(e)=>setName(e.target.value)}
            />

            <input
                className="border p-2 rounded"
                placeholder="SKU"
                onChange={(e)=>setSku(e.target.value)}
            />

            <input
                className="border p-2 rounded"
                type="number"
                placeholder="Qty"
                onChange={(e)=>setQuantity(Number(e.target.value))}
            />

            <button
                onClick={create}
                className="bg-blue-600 text-white px-4 rounded"
            >
                Add
            </button>

            </div>

        </div>

        <div className="bg-white shadow rounded">

            <table className="w-full">

            <thead className="bg-gray-100">

                <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">SKU</th>
                <th className="p-3 text-left">Quantity</th>
                <th></th>
                </tr>

            </thead>

            <tbody>

                {products.map(p=>(
                <tr key={p.id} className="border-t">

                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.sku}</td>
                    <td className="p-3">{p.quantity}</td>

                    <td className="p-3">
                    <button
                        onClick={()=>remove(p.id)}
                        className="text-red-600"
                    >
                        Delete
                    </button>
                    </td>

                </tr>
                ))}

            </tbody>

            </table>

        </div>

        </div>

    </div>
  )
}