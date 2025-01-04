import Header from './components/Header';
import GuitarList from './components/GuitarList';
import Footer from './components/Footer';
import { useEffect, useMemo, useState } from 'react';
import useCart from './hooks/useCart.ts'

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

  const { cart,
    addToCart,
    decreaseProduct,
    deleteProduct,
    deleteCart } = useCart();

  useEffect(() => {
    setData(mockProducts);
  }, [mockProducts]);


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])

  return (
    <>
      <Header cart={cart} increaseProduct={addToCart} decreaseProduct={decreaseProduct} deleteProduct={deleteProduct} deleteCart={deleteCart} />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          <GuitarList products={data} addToCart={addToCart} />
        </div>
        <button
          className="go-up-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Go Up
        </button>

      </main>



      <Footer />
    </>
  )
}

export default App;