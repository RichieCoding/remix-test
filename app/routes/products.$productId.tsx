import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getProduct } from "../lib/shopify";
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.productId, "ProductId params not provided");
  const { productId } = params;
  const product = await getProduct(productId);

  return json({ product });
};

export default function Product() {
  const { product } = useLoaderData<typeof loader>();
  console.log(product);
  return <div>Product</div>;
}
