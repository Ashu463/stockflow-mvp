import { useEffect,useState } from "react"
import api from "../api/api"

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

    await api.post("/products",{
      name,
      sku,
      quantity
    })

    load()
  }

  return(

    <div>

      <h2>Products</h2>

      <input placeholder="Name" onChange={(e)=>setName(e.target.value)} />
      <input placeholder="SKU" onChange={(e)=>setSku(e.target.value)} />
      <input type="number" onChange={(e)=>setQuantity(Number(e.target.value))} />

      <button onClick={create}>Add</button>

      <hr/>

      {products.map(p=>(
        <div key={p.id}>
          {p.name} ({p.quantity})
        </div>
      ))}

    </div>

  )
}