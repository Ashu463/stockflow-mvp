import { Link, useNavigate } from "react-router-dom"

export default function Navbar({ minimal=false }: { minimal?: boolean }) {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("orgId")
    navigate("/")
  }

  return (

    <div className="bg-white border-b shadow-sm px-8 py-4 flex justify-between items-center">

      <h1 className="text-xl font-bold text-blue-600">
        StockFlow
      </h1>

      {!minimal && (

        <div className="flex items-center gap-6">

          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            to="/products"
            className="text-gray-700 hover:text-blue-600"
          >
            Products
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>

        </div>

      )}

    </div>

  )
}