import { useMemo } from "react";



type product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity?: number;
}

type Props = {
  cart: {
    products: product[],
    totalQuantityProducts: number,
  },
  increaseProduct: (item: product) => void,
  decreaseProduct: (itemId: number) => void,
  deleteProduct: (itemId: number) => void,
  deleteCart: () => void,
}

const Header = ({ cart, increaseProduct, decreaseProduct, deleteProduct, deleteCart }: Props) => {

  const cartTotal = useMemo(() => cart.products.reduce((total, item) => total + (item.price * (item.quantity ?? 0)), 0), [cart]);


  const decreaseProductQuantityHandler = (id: number) => {
    decreaseProduct(id);
  }

  const increaseProductQuantityHandler = (item: product) => {
    increaseProduct(item)
  }

  const deleteProductHandler = (id: number) => {
    deleteProduct(id);
  }

  const deleteCartHandler = () => {
    deleteCart();
  }

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/public/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="/public/img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {cart.products.length < 1 && <p className="text-center">El carrito esta vacio</p>}
                {cart.products.length > 0 && <table className="w-100 table">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cart.products.map((item: product) => (
                        <tr key={item.id}>
                          <td>
                            <img
                              className="img-fluid"
                              src={`/public/img/guitarra_${item.id < 10 ? '0' + item.id : item.id}.jpg`}
                              alt={item.name}
                            />
                          </td>
                          <td>{item.name}</td>
                          <td className="fw-bold">${item.price}</td>
                          <td className="flex align-items-start gap-4">
                            <button type="button" className="btn btn-dark" onClick={() => decreaseProductQuantityHandler(item.id)}>
                              -
                            </button>
                            {item.quantity}
                            <button type="button" className="btn btn-dark" onClick={() => increaseProductQuantityHandler(item)}>
                              +
                            </button>
                          </td>
                          <td>
                            <button className="btn btn-danger" type="button" onClick={() => deleteProductHandler(item.id)}>
                              X
                            </button>
                          </td>
                        </tr>
                      ))
                    }

                  </tbody>
                </table>}

                <p className="text-end">
                  Total de productos : {cart.totalQuantityProducts < 0 ? 0 : cart.totalQuantityProducts}
                </p>

                <p className="text-end">
                  Total pagar: <span className="fw-bold">${
                    cartTotal
                  }</span>
                </p>
                <button className="btn btn-dark w-100 mt-3 p-2" onClick={deleteCartHandler} disabled={cart.products.length === 0}>
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
