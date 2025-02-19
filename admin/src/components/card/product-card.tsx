import Image from "next/image";
import Link from "next/link";
import AddToCart from "../button/addToCart";
import BuyNow from "../button/buyNow";

export default function ProductCard({ product }: { product: TProduct }) {
  // console.log(product?.images[0], "Product Image");
  const productSend = {
    id: product?._id,
    name: product?.name,
    price: product?.price,
    image: product?.images[0],
    stock: product?.stock,
  };
  return (
    <div className="mb-4 w-full max-w-[230px] overflow-hidden rounded-md border-none shadow-none">
      <Link href={`/products/${product?._id}`}>
        <div className="mb-2">
          <Image
            src={product?.images[0]}
            className="h-full w-full rounded-md lg:h-[240px]"
            width={240}
            height={240}
            alt={product?.name}
            loading="lazy"
          />
        </div>
        <div className="mb-2 grid grid-rows-2 gap-0.5 md:gap-2">
          <h4 className="truncate text-sm font-medium capitalize md:text-base">
            {product?.name}
          </h4>
          <h6 className="text-sm md:text-base">
            TK <span className="font-bold">{product?.price.toFixed(2)}</span>
          </h6>
        </div>
      </Link>
      <div className="max-w-[1360px]:flex-nowrap flex flex-wrap gap-2 xl:gap-1">
        <AddToCart textVisible product={productSend} />
        <BuyNow product={productSend} />
      </div>
    </div>
  );
}
