import { JSXElementConstructor, Key, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import ProductReview from '../components/ProductReview';
import { Button } from '../components/ui/button';
import { useGetProductQuery } from '../redux/api/productsApi/productsApi';

export default function ProductDetails() {
  const { id } = useParams();

  const { data: product, isLoading, error } = useGetProductQuery(id);
  console.log(product);

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={product?.images[0]} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{product?.title}</h1>
          <p className="text-xl">Rating: {product?.rating}</p>
          <p className="text-xl">{product?.description}</p>
          <ul className="space-y-1 text-lg">
            {product?.tags?.map(
              (
                tag: ReactElement<any, string | JSXElementConstructor<any>>,
                idx: Key | null | undefined
              ) => <li key={idx}>{tag}</li>
            )}
          </ul>
          <Button>Add to cart</Button>
        </div>
      </div>
      <ProductReview id={Number(id)} />
    </>
  );
}
