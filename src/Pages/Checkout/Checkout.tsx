import { useCart } from "../../Hooks/useCart"


const Checkout = () => {

  const { getCartItemsWithProducts, removeFromCart, updateQuantity, getCartTtotal, clearCart } = useCart()
  const cartItems = getCartItemsWithProducts()
  const total = getCartTtotal()

  const placeOrder = () => {
    alert("Order placed successfully!");
    clearCart();
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-container">
          <div className="checkout-items">
            <h2 className="checkout-section-title">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <img src={item?.product?.image} alt={item?.product?.name} className="checkout-item-image"></img>
                <div className="checkout-item-details">
                  <h3 className="checkout-item-name">{item?.product?.name}</h3>
                  <p className="checkout-item-price">${item?.product?.price}</p>
                </div>
                <div className="checkout-item-controls">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item?.id, item?.quantity - 1)} className="quantity-btn">-</button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item?.id, item?.quantity + 1)} className="quantity-btn">+</button>
                  </div>
                  
                  <p className="checkout-item-total">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(item!.product!.price * item.quantity)}
                  </p>

                  <button onClick={() => removeFromCart(item?.id)} className="btn btn-secondary btn-small">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-summary">
            <h2 className="checkout-section-title">Total</h2>
            <div className="checkout-total">
              <p className="checkout-total-label">Subtotal:</p>
              <p className="checkout-total-value">${total.toFixed(2)}</p>
            </div>
            <div className="checkout-total">
              <p className="checkout-total-label">Total:</p>
              <p className="checkout-total-value checkout-total-final">
                ${total.toFixed(2)}
              </p>
            </div>
            <button
              className="btn btn-primary btn-large btn-block"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
