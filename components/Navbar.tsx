"use client"
import { useCart } from "@/context/CartContext"
import Link from "next/link"

const Navbar = () => {
  const { totalQuantity, cart } = useCart()

  const extractedCartId = cart?.id?.split("/").pop()

  return (
    <div className="flex justify-between items-center p-4 sticky top-0 bg-gray-100 text-black border-b border-gray-700 shadow-lg z-50">
      <div className="flex gap-2">
        <Link
          href={"/"}
          className="text-black px-4 py-2 rounded-md border border-gray-700 hover:bg-gray-200 transition-all"
        >
          FOUR SEASONS
        </Link>
        <Link
          href={"/collections"}
          className="text-black px-4 py-2 rounded-md border border-gray-700 hover:bg-gray-200 transition-all"
        >
          Collections
        </Link>
        <Link
          href={"/calender"}
          className="text-black px-4 py-2 rounded-md border border-gray-700 hover:bg-gray-200 transition-all"
        >
          Calender
        </Link>
      </div>

      <Link
        href={`/cart/${extractedCartId}`}
        className="text-black flex items-center gap-2 px-4 py-2 rounded-md border border-gray-700 hover:bg-gray-200 transition-all"
      >
        🛒 <span>({totalQuantity})</span>
      </Link>
    </div>
  )
}

export default Navbar
