import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../types/globalTypes';

interface ICart {
  products: IProduct[];
  total: number;
}

const initialState: ICart = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const isExist = state.products.find(p => p.id === action.payload.id);

      if (!isExist) {
        state.products.push({ ...action.payload, quantity: 1 });
      } else {
        isExist.quantity = isExist.quantity! + 1;
      }

      state.total += action.payload.price;
    },
    removeOneFromCart: (state, action: PayloadAction<IProduct>) => {
      const isExist = state.products.find(p => p.id === action.payload.id);

      if (isExist && isExist.quantity! > 1) {
        isExist.quantity = isExist?.quantity! - 1;
      } else {
        state.products = state.products.filter(p => p.id !== action.payload.id);
      }

      state.total -= action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(p => p.id !== action.payload.id);

      state.total -= action.payload.price * action.payload.quantity!;
    },
  },
});

export const { addToCart, removeOneFromCart, removeFromCart } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;
