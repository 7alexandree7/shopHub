import { createContext, useState, type ReactNode } from "react";
import { getProductById } from "../data/products";
import type { Product } from "../Types/types";

interface CartProviderProps {
    children: ReactNode
}

interface CartContextData {
    addToCart: (productId: any) => void
    getCartItemsWithProducts: () => CartItem[]
    removeFromCart: (productId: any) => void
    updateQuantity: (productId: any, quantity: number) => void
    getCartTtotal: () => number
    clearCart: () => void
    cartItems: CartItem[]
}

interface CartItem {
    id: string | number
    quantity: number
    product?: Product
}

export const CartContext = createContext<CartContextData | null>(null)

export default function CartProvider({ children }: CartProviderProps) {

    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const addToCart = (productId: string | number) => {
        const existingItem = cartItems.find((item) => item.id === productId);
        if (existingItem) {
            const currentQuantity = existingItem.quantity;
            const updateCartItems = cartItems.map((item) =>
                item.id === productId
                    ? { id: productId, quantity: currentQuantity + 1 }
                    : item
            )
            setCartItems(updateCartItems)
        }
        else {
            setCartItems([...cartItems, { id: productId, quantity: 1 }])
        }
    }

    const getCartItemsWithProducts = () => {
        return cartItems.map(item => ({
            ...item,
            product: getProductById(item.id)
        })).filter(item => item.product)
    }


    const removeFromCart = (productId: string | number) => {
        setCartItems(cartItems.filter((item) => item.id !== productId));
    }


    const updateQuantity = (productId: string | number, quantity: number) => {
        if (quantity <= 0 ) {
            removeFromCart(productId);
            return
        }

        setCartItems(cartItems.map((item) => item.id === productId ? {...item , quantity} : item))
    }

    const clearCart = () => {
        setCartItems([])
    }


    const getCartTtotal = () => {
        const total = cartItems.reduce((total, item) => {
            const product = getProductById(item?.id)
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
        return total
    }

    return (
        <CartContext.Provider value={{ addToCart, cartItems, getCartItemsWithProducts, removeFromCart, updateQuantity, getCartTtotal, clearCart }}>
            {children}
        </CartContext.Provider>
    )
} 