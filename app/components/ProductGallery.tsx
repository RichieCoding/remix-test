import { Image } from "../lib/shopify/types";

type ProductGallery = {
  featuredImage: Image;
  images?: Image[];
};

const ProductGallery = ({ featuredImage }: ProductGallery) => {
  return (
    <div>
      <picture>
        <img
          src={featuredImage.url}
          alt={featuredImage.altText}
          width={featuredImage.width}
          height={featuredImage.height}
        />
      </picture>
    </div>
  );
};

export default ProductGallery;
