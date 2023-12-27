import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import {
  Form,
  useFormAction,
  useLoaderData,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import { addToCart, getProduct } from "../lib/shopify";
import invariant from "tiny-invariant";
import ProductGallery from "../components/ProductGallery";
import { removePriceTrailingZeros } from "../lib/utils";
import Button from "../components/Button";
import { getSession } from "../sessions";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.productId, "ProductId params not provided");
  const { productId } = params;
  const product = await getProduct(productId);
  if (!product) {
    throw new Response("product not found", { status: 404 });
  }
  return json({ product });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const session = await getSession(request.headers.get("Cookie"));
  const cartId = session.get("cartId");
  const formData = await request.formData();
  const productId = String(formData.get("variantId"));

  if (cartId && productId) {
    await addToCart(cartId, [
      {
        merchandiseId: productId,
        quantity: 1,
      },
    ]);
  }

  return redirect(url.pathname);
};

export default function Product() {
  const { product } = useLoaderData<typeof loader>();
  const formAction = useFormAction();
  const navigation = useNavigation();
  const isPending =
    navigation.state !== "idle" &&
    navigation.formAction === formAction &&
    navigation.formMethod === "POST";

  return (
    <div className="px-0 md:px-6 lg:px-10">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[fit-content(500px)_1fr] xl:gap-10">
        <div className="min-w-1/2 max-w-full lg:min-w-[500px]">
          <ProductGallery featuredImage={product.featuredImage} />
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <p>{product.productType}</p>
            <h1 className="text-5xl font-serif">{product.title}</h1>
          </div>
          <div>5.0 (24 Reviews)</div>
          <div>
            <p className="text-xl">
              ${removePriceTrailingZeros(product.variants[0].price.amount)}
              <span className="text-base text-gray-600">
                {" "}
                / {product.variants[0].title}
              </span>
            </p>
          </div>
          <Form method="POST">
            <input
              name="variantId"
              type="hidden"
              value={product.variants[0].id}
            />
            <Button
              type="submit"
              aria-label="Add item to cart"
              className="w-full hover:opacity-85 bg-black py-2 text-white"
              disabled={isPending}
            >
              {isPending ? "ADDING..." : "ADD TO BAG"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div>
      <p>Product cannot be found</p>
    </div>
  );
};
