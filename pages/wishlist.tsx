import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import useWishlistStore from "../stores/wishlistStore";
import { useEffect, useState } from "react";

export default function Wishlist() {
  const wishlist = useWishlistStore((state) => state.wishlistItems);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // prevent showing server-side empty state before client hydration
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#18181b] p-4 sm:p-8 pb-20">
      <Header />
      <main className="mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center">My Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {wishlist.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No items in wishlist.</div>
          ) : (
            wishlist.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-white dark:bg-[#232329] rounded-2xl shadow hover:shadow-xl transition-all p-4 flex flex-col items-center text-center cursor-pointer"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={110}
                  height={110}
                  className="mb-3 rounded-lg object-contain"
                  style={{ background: "#f1f5f9" }}
                />
                <h2 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 mb-1">{product.name}</h2>
                <span className="text-base font-semibold text-blue-600 dark:text-blue-400 mb-2">{product.price}</span>
              </Link>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}