import ProductCard from '../components/ProductCard';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Switch } from '../components/ui/switch';
import { useToast } from '../components/ui/use-toast';
import { useGetProductsQuery } from '../redux/api/productsApi/productsApi';
import { setPriceRange, toggleState } from '../redux/features/productsSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { IProduct } from '../types/globalTypes';

export default function Products() {
  // const [data, setData] = useState<IProduct[]>([]);
  // useEffect(() => {
  //   fetch('./data.json')
  //     .then(res => res.json())
  //     .then(data => setData(data));
  // }, []);

  const { data: products, isLoading, error } = useGetProductsQuery(undefined);

  console.log('data ', products);

  const { toast } = useToast();

  //! Dummy Data
  const { status, priceRange } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();

  //! **

  const handleToggle = () => {
    dispatch(toggleState());
    status === true
      ? products?.filter(
          (item: { availabilityStatus: string }) =>
            item.availabilityStatus === 'In Stock'
        )
      : false;
  };

  const handleSlider = (value: number[]) => {
    dispatch(setPriceRange(value[0]));
  };

  let productsData;

  if (status) {
    productsData = products?.filter(
      (item: { availabilityStatus: string; price: number }) =>
        item.availabilityStatus === 'In Stock' && item.price < priceRange
    );
  } else if (priceRange > 0) {
    productsData = products?.filter(
      (item: { price: number }) => item.price < priceRange
    );
  } else {
    productsData = products;
  }

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-xl uppercase">Availability</h1>
          <div
            onClick={() => handleToggle()}
            className="flex items-center space-x-2 mt-3"
          >
            <Switch id="in-stock" />
            <Label htmlFor="in-stock">
              {!status ? 'In Stock' : 'Available'}
            </Label>
          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-xl uppercase">Price Range</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={[150]}
              max={150}
              min={0}
              step={1}
              onValueChange={value => handleSlider(value)}
            />
          </div>
          <div>From 0$ To {priceRange}$</div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {productsData?.map((product: IProduct) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}
