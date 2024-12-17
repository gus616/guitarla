import Header from './components/Header';
import GuitarList from './components/GuitarList';
import Footer from './components/Footer';
import { useEffect, useMemo, useState } from 'react';

type product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity?: number;
}

function App() {
  const mockProducts = useMemo(() => [
    {
      id: 1,
      name: 'Lukather',
      image: 'guitarra_01',
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 299,
    },
    {
      id: 2,
      name: 'SRV',
      image: 'guitarra_02',
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 349,
    },
    {
      id: 3,
      name: 'Borland',
      image: 'guitarra_03',
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 329,
    },
    {
      id: 4,
      name: 'VAI',
      image: 'guitarra_04',
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 299,
    },
    {
      id: 5,
      name: 'Thompson',
      image: 'guitarra_05',
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 399,
    },
    {
      id: 6,
      name: 'White',
      image: 'guitarra_06',
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 329,
    },
    {
      id: 7,
      name: 'Cobain',
      image: 'guitarra_07',
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 349,
    },
    {
      id: 8,
      name: 'Dale',
      image: 'guitarra_08',
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 379,
    },
    {
      id: 9,
      name: 'Krieger',
      image: 'guitarra_09',
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 289,
    },
    {
      id: 10,
      name: 'Campbell',
      image: 'guitarra_10',
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 349,
    },
    {
      id: 11,
      name: 'Reed',
      image: 'guitarra_11',
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 399,
    },
    {
      id: 12,
      name: 'Hazel',
      image: 'guitarra_12',
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 379,
    },
  ], []);


  const [data, setData] = useState(mockProducts);

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');

    return localStorageCart ? JSON.parse(localStorageCart) : {
      products: [],
      totalQuantityProducts: 0
    }
  }

  const [cart, setCart] = useState<{
    products: product[],
    totalQuantityProducts: number,
  }>(initialCart);


  useEffect(() => {
    setData(mockProducts);
  }, [mockProducts]);


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])




  function addToCart(item: product) {
    const itemExists = cart.products.find((product: product) => product.id === item.id);

    if (itemExists) {
      setCart((prevState) => ({
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
      }));
    } else {
      setCart((prevState) => ({
        products: [...prevState.products, { ...item, quantity: 1 }],
        totalQuantityProducts: prevState.totalQuantityProducts + 1,
      }));
    }
  };

  function decreaseProduct(itemId: number) {
    const itemExists = cart.products.find((product: product) => product.id === itemId);

    if (itemExists !== undefined && itemExists.quantity === 1) {
      deleteProduct(itemId);
    }

    if (itemExists) {
      setCart((prevState) => ({
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
      }));
    }
  }

  function deleteProduct(id: number) {

    setCart((prevState) => ({
      products: prevState.products.filter((product: product) => product.id !== id),
      totalQuantityProducts: prevState.totalQuantityProducts - (prevState.products.find((product: product) => product.id === id)?.quantity || 0),
    }));
  }

  function deleteCart() {
    setCart({
      products: [],
      totalQuantityProducts: 0,
    })
  }

  return (
    <>
      <Header cart={cart} increaseProduct={addToCart} decreaseProduct={decreaseProduct} deleteProduct={deleteProduct} deleteCart={deleteCart} />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          <GuitarList products={data} addToCart={addToCart} />
        </div>
      </main>


      <Footer />
    </>
  )
}

export default App;