import { useState } from "react";
import type { product } from "../types";
function useCart() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');

    return localStorageCart
      ? JSON.parse(localStorageCart)
      : {
          products: [],
          totalQuantityProducts: 0,
        };
  };

  const [cart, setCart] = useState<{
    products: product[];
    totalQuantityProducts: number;
  }>(initialCart);

  function addToCart(item: product) {
    const itemExists = cart.products.find(
      (product: product) => product.id === item.id
    );

    if (itemExists) {
      setCart(
        (prevState: {
          products: product[];
          totalQuantityProducts: number;
        }) => ({
          products: prevState.products.map((product: product) => {
            if (product.id === item.id) {
              return {
                ...product,
                quantity: product.quantity ? product.quantity + 1 : 1,
              };
            }
            return product;
          }),
          totalQuantityProducts: prevState.totalQuantityProducts + 1,
        })
      );
    } else {
      setCart(
        (prevState: {
          products: product[];
          totalQuantityProducts: number;
        }) => ({
          products: [...prevState.products, { ...item, quantity: 1 }],
          totalQuantityProducts: prevState.totalQuantityProducts + 1,
        })
      );
    }
  }

  function decreaseProduct(itemId: number) {
    const itemExists = cart.products.find(
      (product: product) => product.id === itemId
    );

    if (itemExists !== undefined && itemExists.quantity === 1) {
      deleteProduct(itemId);
    }

    if (itemExists) {
      setCart(
        (prevState: {
          products: product[];
          totalQuantityProducts: number;
        }) => ({
          products: prevState.products.map((product: product) => {
            if (product.id === itemId) {
              return {
                ...product,
                quantity: product.quantity ? product.quantity - 1 : 0,
              };
            }
            return product;
          }),
          totalQuantityProducts: prevState.totalQuantityProducts - 1,
        })
      );
    }
  }

  function deleteProduct(id: number) {
    setCart(
      (prevState: { products: product[]; totalQuantityProducts: number }) => ({
        products: prevState.products.filter(
          (product: product) => product.id !== id
        ),
        totalQuantityProducts:
          prevState.totalQuantityProducts -
          (prevState.products.find((product: product) => product.id === id)
            ?.quantity || 0),
      })
    );
  }

  
  function deleteCart() {
    setCart({
      products: [],
      totalQuantityProducts: 0,
    })
  }

  return {
    cart,
    addToCart,
    decreaseProduct,
    deleteProduct,
    deleteCart,
  };
}

export default useCart;
