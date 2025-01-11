import Header from './components/Header';
import GuitarList from './components/GuitarList';
import Footer from './components/Footer';
import { useEffect, useReducer } from 'react';
import { cartReducer, initialState } from './reducers/cart-reducer.ts';

function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

/*   const { cart,
    addToCart,
    decreaseProduct,
    deleteProduct,
    deleteCart } = useCart(); */

/*   useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]) */


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart])
  
  

  return (
    <>
      <Header state={state} dispatch={dispatch} />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          <GuitarList products={state.products} dispatch={dispatch}/>
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