import GuitarItem from "./GuitarItem"
import { product } from "../types"
import { CartActions } from "../reducers/cart-reducer"

type Props = {
    products: product[],
    dispatch: React.Dispatch<CartActions>
}


const GuitarList = ({ products, dispatch }: Props) => {

    if (products?.length === 0) return <p>No hay productos para mostrar.</p>

    return (
        (
            <>
                {products.map((product: product) => (
                    <GuitarItem key={product.id} product={product} dispatch={dispatch} />
                ))}
            </>
        )
    )
}

export default GuitarList