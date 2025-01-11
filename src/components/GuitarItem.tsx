import { CartActions } from "../reducers/cart-reducer";

 type GuitarItemProps = {
  product: {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
  },
  dispatch: React.Dispatch<CartActions>
}

const GuitarItem = ({ product , dispatch}: GuitarItemProps) => {
  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img
          className="img-fluid"
          src={`img/guitarra_${product.id < 10 ? '0' + product.id : product.id}.jpg`}
          alt="imagen guitarra"
        />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{product.name}</h3>
        <p>
          {product.description}
        </p>
        <p className="fw-black text-primary fs-3">${product.price}</p>
        <button type="button" className="btn btn-dark w-100" onClick={() => dispatch({
          type: 'add-to-cart',
          payload: {
            item: product
          }
        })}>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default GuitarItem;
