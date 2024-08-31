import { ChangeEvent, FormEvent, Key, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import {
  useGetReviewQuery,
  usePostReviewMutation,
} from '../redux/api/productsApi/productsApi';
import { useAppSelector } from '../redux/hooks';
import { IReview } from '../types/globalTypes';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface ProductReviewProps {
  id: number;
}

export default function ProductReview({ id }: ProductReviewProps) {
  const { user } = useAppSelector(state => state.users);

  const [inputValue, setInputValue] = useState<string>('');
  const { data: reviews } = useGetReviewQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 5000, // ideal time is 30s but for development purpose we will go for 5s only
  });
  const [postComment, { isLoading, isError, isSuccess }] =
    usePostReviewMutation();

  console.log(reviews);
  console.log({ isLoading, isError, isSuccess });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputValue);
    const now = new Date();
    const formattedDate = now.toISOString();
    const randomNumber = Math.floor(Math.random() * 5) + 1;

    const options = {
      id,
      data: {
        rating: randomNumber,
        comment: inputValue,
        date: formattedDate,
        reviewerEmail: user?.email,
        reviewerName: `${user?.email?.split('@')[0]} ${user?.email?.split('@')[1].split('.')[0]}`,
      },
    };

    await postComment(options);
    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5 items-center">
        <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
          <Textarea
            className="min-h-[30px] w-full"
            onChange={handleChange}
            value={inputValue}
          />
          <Button
            type="submit"
            className="rounded-full h-10 w-10 p-2 text-[25px]"
          >
            <FiSend />
          </Button>
        </form>
      </div>
      <div className="mt-10">
        {reviews?.map((review: IReview, index: Key | null | undefined) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{review?.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
