import { Link } from 'react-router-dom';
import { addToCart } from '../redux/features/cartSlice';
import { useAppDispatch } from '../redux/hooks';
import { IProduct } from '../types/globalTypes';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

interface IProps {
  product: IProduct;
}

export default function ProductCard({ product }: IProps) {
  const dispatch = useAppDispatch();

  const handleAddProduct = (product: IProduct) => {
    dispatch(addToCart(product));
    toast({
      description: 'Product Added',
    });
  };

  return (
    <div>
      <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/product-details/${product.id}`} className="w-full">
          <img src={product?.images[0]} alt="product" />
          <h1 className="text-xl font-semibold">{product?.title}</h1>
        </Link>
        <p>Rating: {product?.rating}</p>
        <p className="text-sm">Availability: {product?.availabilityStatus}</p>
        <p className="text-sm">Price: {product?.price}</p>
        <Button variant="default" onClick={() => handleAddProduct(product)}>
          Add to cart
        </Button>
      </div>
    </div>
  );
}
