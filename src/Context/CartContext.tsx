import { createContext, useState, type ReactNode } from "react";

interface CartProviderProps {
    children: ReactNode
}

interface CartContextData {
    addToCart: (productId: any) => void
    cartItems: CartItem[]
}

interface CartItem {
    id: string | number
    quantity: number
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

    return (
        <CartContext.Provider value={{ addToCart, cartItems }}>
            {children}
        </CartContext.Provider>
    )
}