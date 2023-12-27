import { json } from "@remix-run/node";
import { getProducts } from "../lib/shopify";
import { useLoaderData } from "@remix-run/react";
import ProductCard from "../components/ProductCard";

export const loader = async () => {
  const products = await getProducts({});

  if (!products) {
    throw new Response("products not found", { status: 404 });
  }

  return json({ products });
};

export default function Collections() {
  const { products } = useLoaderData<typeof loader>();

  return (
    <div className="px-0 md:px-6 lg:px-10 flex flex-col gap-6">
      <h2 className="text-3xl">All Products</h2>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            image={product.featuredImage}
            price={product.priceRange.maxVariantPrice.amount}
            handle={product.handle}
          />
        ))}
      </div>
    </div>
  );
}
