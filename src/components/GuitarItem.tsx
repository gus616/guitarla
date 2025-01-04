import { GuitarItemProps, product } from "../types";

const GuitarItem = ({ product, addToCart }: GuitarItemProps) => {
  const handleAddToCart = (item: product) => {
    addToCart(item);
  };
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
        <button type="button" className="btn btn-dark w-100" onClick={() => handleAddToCart(product)}>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default GuitarItem;
