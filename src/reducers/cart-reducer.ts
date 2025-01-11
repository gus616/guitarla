import { db } from '../data/db';
import { product } from '../types';

export type CartActions =
  | { type: 'add-to-cart'; payload: { item: product } }
  | { type: 'remove-from-cart'; payload: { id: product['id'] } }
  | { type: 'decrease-quantity'; payload: { id: product['id'] } }
  | { type: 'increase-quantity'; payload: { id: product['id'] } }
  | { type: 'clear-cart' };

export type CartState = {
  products: product[];
  cart: product[];
};

const initialCart = (): product[] => {
  const localStorageCart = localStorage.getItem('cart');

  return localStorageCart ? JSON.parse(localStorageCart) : [];
};

export const initialState: CartState = {
  products: db,
  cart: initialCart(),
};

export const cartReducer = (state: CartState, action: CartActions) => {
  if (action.type === 'add-to-cart') {
    const itemExists = state.cart.find(
      (guitar) => guitar.id === action.payload.item.id
    );

    let updatedCart: product[] = [];

    if (itemExists) {
      updatedCart = state.cart.map((item) => {
        if (item.id === action.payload.item.id) {
          return { ...item, quantity: (item.quantity || 0) + 1 };
        } else {
          return item;
        }
      });
    } else {
      const newItem: product = { ...action.payload.item, quantity: 1 }; // Set initial quantity to 1
      updatedCart = [...state.cart, newItem];
    }

    return { ...state, cart: updatedCart };
  }

  if (action.type === 'remove-from-cart') {
    const itemExists = state.cart.find(
      (guitar) => guitar.id === action.payload.id
    );

    let updatedCart: product[] = [];

    if (itemExists) {
      updatedCart = state.cart.filter((item) => item.id !== action.payload.id);
    }

    return { ...state, cart: updatedCart };
  }

  if (action.type === 'decrease-quantity') {
    const itemExists = state.cart.find(
      (guitar) => guitar.id === action.payload.id
    );

    let updatedCart: product[] = [];

    if (itemExists && itemExists.quantity === 1) {
      updatedCart = state.cart.filter((item) => item.id !== action.payload.id);
    }

    if (
      itemExists &&
      itemExists.quantity !== undefined &&
      itemExists.quantity > 1
    ) {
      updatedCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: (item.quantity || 0) - 1 };
        } else {
          return item;
        }
      });
    }

    return { ...state, cart: updatedCart };
  }

  if (action.type === 'increase-quantity') {
    const itemExists = state.cart.find(
      (guitar) => guitar.id === action.payload.id
    );

    let updatedCart: product[] = [];

    if (itemExists && itemExists.quantity !== undefined) {
      updatedCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: (item.quantity || 0) + 1 };
        } else {
          return item;
        }
      });

      return { ...state, cart: updatedCart };
    }
  }

  if (action.type === 'clear-cart') {
    return {
      products: db,
      cart: [],
      totalQuantityProducts: 0,
    };
  }

  return state;
};
