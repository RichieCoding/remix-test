import { Link } from "@remix-run/react";
import { Image as ImageType } from "../lib/shopify/types";
import { removePriceTrailingZeros } from "../lib/utils";

type Props = {
  image: ImageType;
  price: string;
  title: string;
  handle: string;
};

const ProductCard = ({ image, price, title, handle }: Props) => {
  return (
    <Link prefetch="intent" to={`/products/${handle}`} className="border ">
      <div>
        <picture>
          <img
            src={image.url}
            alt={image.altText}
            width={image.width}
            height={image.height}
            loading="eager"
          />
        </picture>
      </div>
      <div className="text-center text-xl pb-4">
        <p>{title}</p>
        <p>${removePriceTrailingZeros(price)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
