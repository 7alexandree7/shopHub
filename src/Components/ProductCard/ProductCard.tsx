import { Link } from "react-router-dom"
import type { Product } from "../../Types/types"
import { useCart } from "../../Hooks/useCart"


const ProductCard = ({ product }: { product: Product }) => {

    const { addToCart, cartItems } = useCart();
    const productInCart  = cartItems.find((item) => item.id === product?.id)
    const productQuantityLabel = productInCart ?  `(${productInCart.quantity})` : ''

    return (
        <div className="product-card">
            <img src={product?.image} alt={product?.name} className="product-card-image" />
            <div className="product-card-content">
                <h3 className="product-card-name">{product?.name}</h3>
                <p className="product-card-price">${product?.price}</p>
                <div className="product-card-actions">
                    <Link to={`/products/${product?.id}`} className="btn btn-secondary">View Details</Link>
                    <button onClick={() => addToCart(product?.id)} className="btn btn-primary">Add to Cart {productQuantityLabel} </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
