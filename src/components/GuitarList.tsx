import GuitarItem from "./GuitarItem"


type product = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}

type Props = {
    products: product[],
    addToCart: (item: product) => void;
}


const GuitarList = ({products, addToCart}: Props) => {

  if(products?.length === 0) return <p>No hay productos para mostrar.</p>

  return (
    (
        <>
            {products.map((product: product) => (
                <GuitarItem key={product.id} product={product} addToCart={addToCart} />
            ))}
        </>
    )
  )
}

export default GuitarList