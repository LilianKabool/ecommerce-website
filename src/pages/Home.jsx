import { getProducts } from "../data/Products";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/navbar";
export default function Home() {
  const products = getProducts();
  return (
    <div className="flex-1 min-h-screen bg-[var(--background)]">
  <Navbar />

  <div className="max-w-[1280px] mx-auto px-6 py-10">
    <h2 className="text-4xl font-bold text-center text-[var(--primary)] mb-12">
      Our Products
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  </div>
</div>
  );
}