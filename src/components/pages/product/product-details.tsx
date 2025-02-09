"use client";
import AddToCart from "@/components/button/addToCart";
import BuyNow from "@/components/button/buyNow";
import CardCarousel from "@/components/card/card-carousel";
import CardCarouselSkeleton from "@/components/skeleton/card-carousel-skeleton";
import Title from "@/components/title";
import { useGetProducts } from "@/hooks/use-product";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import AddReviewForm from "./AddReviewForm";
import EmblaCarousel from "./EmblaCarousel";
import Reviews from "./reviews";
import { useCart } from "@/context/cart-provider";
import { useUser } from "@/context/user-provider";

export default function ProductDetails({ product }: { product: TProduct }) {
  const slides = product?.images;
  const { user } = useUser();
  const { name, price, description, stock } = product || {
    name: "",
    price: 0,
    description: "",
    stock: 0,
  };
  const { products, isLoading } = useGetProducts({
    query: "",
    category: product?.category || "",
    sortOrder: "",
  });
  // const rating = 4;
  const { cart, updateQuantity } = useCart();

  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const defaultQuantity =
      cart.find((item) => item.id === product._id)?.quantity || 1;
    setQuantity(defaultQuantity);
  }, [cart, product._id]);
  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
    if (cart.find((item) => item.id === product._id)) {
      updateQuantity(product._id, quantity - 1);
    }
  };
  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(stock, prev + 1));
    if (cart.find((item) => item.id === product._id)) {
      updateQuantity(product._id, quantity + 1);
    }
  };

  return (
    <div className="mb-4 space-y-4 sm:mb-6 md:container md:my-8 md:gap-6">
      <div className="flex flex-col justify-center gap-4 md:flex-row md:gap-10">
        <div className="md:w-1/2">
          <EmblaCarousel slides={slides} />
        </div>
        <div className="space-y-2 px-4 sm:space-y-3 md:w-1/2 md:space-y-4 md:px-0 lg:space-y-6">
          <div>
            <h1 className="text-primary-900 text-xl font-bold md:text-2xl lg:text-3xl">
              {name}
            </h1>
            <p className="text-primary-900 text-lg slashed-zero md:text-xl lg:text-2xl">
              <span className="font-semibold">TK. {price?.toFixed(2)}</span>
            </p>
          </div>
          <div
            className="text-sm text-slate-700"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <div className="flex items-center space-x-4">
            <span className="text-primary-700">Quantity:</span>
            <div className="border-primary flex items-center overflow-hidden rounded border">
              <button
                className="bg-primary rounded-none p-1.5 text-xs disabled:opacity-50 md:text-sm"
                onClick={decreaseQuantity}
                disabled={quantity === 1}
              >
                <Minus className="h-4 w-4 text-white" />
              </button>
              <span className="text-primary-800 h-full px-2">{quantity}</span>
              <button
                className="bg-primary rounded-none p-1.5 text-xs disabled:opacity-50 md:text-sm"
                onClick={increaseQuantity}
                disabled={quantity === product?.stock}
              >
                <Plus className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          {/* <div className="flex items-center text-green-600">
            <Truck className="w-5 h-5 mr-2" />
            <span>Free shipping - Estimated delivery in 3-5 days</span>
          </div> */}

          <p className={`${stock > 0 ? "text-green-600" : "text-red-600"}`}>
            {stock > 0 ? `In stock (${stock} available)` : "Out of stock"}
          </p>

          <div className="flex gap-2">
            <AddToCart
              className="flex-1"
              textVisible
              product={{
                id: product?._id,
                name: name,
                price: price,
                image: product?.images[0],
                stock,
              }}
              quantity={quantity}
            />
            <BuyNow
              className="flex-1"
              product={{
                id: product?._id,
                name: name,
                price: price,
                image: product?.images[0],
                stock,
              }}
              quantity={quantity}
            />
          </div>
        </div>
      </div>
      <hr />

      <div className="space-y-4 px-4 md:px-0">
        <div className="my-4 md:my-6">
          <Reviews productId={product?._id} />
          {user && user.role == "admin" ? null : !user ? null : (
            <AddReviewForm productId={product?._id} />
          )}
        </div>
        <div>
          <Title className="mb-4 md:mb-6">Similar Products</Title>
          {isLoading ? (
            <CardCarouselSkeleton />
          ) : products?.length ? (
            <CardCarousel
              cardArr={products.filter((p) => p._id !== product._id)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
