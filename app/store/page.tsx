import Link from "next/link";
import Basket from "../../components/Basket";
import ProductList from "../../components/ProductList";
import Image from "next/image";

export default function ProductsPage() {
  return (
    <>
      <header className="p-4 flex gap-1">
        <Link href="/">&lt; Back to home page</Link>
      </header>

      <main className="flex flex-col justify-between p-4">
        <nav className="flex gap-4 justify-between">
          <div className="flex gap-1">
            <Image
              className="h-10"
              src="https://cheffelo.com/wp-content/uploads/2024/05/Cheffelo_Logo_HappyRed_sRGB.png"
              alt="Cheffelo"
              width={200}
              height={40}
            />
            <h3>Store</h3>
          </div>
          <Basket />
        </nav>
        <ProductList />
      </main>
    </>
  );
}
