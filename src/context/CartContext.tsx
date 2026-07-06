import React, { createContext, useContext, useState, useReducer, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { CartItem, Product } from "../types/Product"

//Reducer Setup
enum CartActionType {
    AddItem = "AddItem",
    RemoveItem = "RemoveItem",
    UpdateQuantity = "UpdateQuantity",
    CheckOut = "CheckOut",
    LoadCart = "LoadCart"
}

type CartState = {
    cartItems: CartItem[]
} 

type CartAction = 
    | { type: CartActionType.AddItem; payload: { product: Product, quantity: number } }
    | { type: CartActionType.RemoveItem; payload: { productId: number } }
    | { type: CartActionType.UpdateQuantity; payload: { productId: number, quantity: number } }
    | { type: CartActionType.CheckOut }
    | { type: CartActionType.LoadCart; payload: CartItem[] }

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case CartActionType.AddItem: {
            const { product, quantity } = action.payload
            const existingItem = state.cartItems.find(item => item.product.id === product.id)
            if (existingItem) {
                return {
                    cartItems: state.cartItems.map(item =>
                        item.product.id === product.id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    )
                }
            }
            return { cartItems: [...state.cartItems, { product: product, quantity: quantity }] }
        }
        case CartActionType.RemoveItem: {
            const productId = action.payload.productId
            return { cartItems: state.cartItems.filter(item => item.product.id !== productId) }
        }
        case CartActionType.UpdateQuantity: {
            const { productId, quantity } = action.payload
            const items = state.cartItems.map(item =>
                item.product.id === productId ? { ...item, quantity: quantity } : item,
            )
            return { cartItems: items }
        }
        case CartActionType.CheckOut:
            return { cartItems: [] }
        case CartActionType.LoadCart:
            return { cartItems: action.payload }
        default:
            return state
    }
}

//Context Setup
type CartContextType = {
    cartItems: CartItem[]
    addItem: (product: Product, quantity: number) => void
    removeItem: (productId: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    checkout: () => void
    totalPrice: number
    totalItems: number
}

const CartContext = createContext<CartContextType | null>(null)

const initialState: CartState = {
    cartItems: []
}

const CART_STORAGE_KEY = 'cart_items'

export function CartProvider({ children }: { children: React.ReactNode }) {

    const [state, dispatch] = useReducer(cartReducer, initialState)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    useEffect(() => {
        loadCart()
    }, [])

    useEffect(() => {
        if (isLoaded) {
            saveCart()
        }
    }, [state.cartItems])

    const loadCart = async () => {
        try {
            const saveData = await AsyncStorage.getItem(CART_STORAGE_KEY)
            if (saveData) {
                const cartItems: CartItem[] = JSON.parse(saveData)
                dispatch({ type: CartActionType.LoadCart, payload: cartItems })
            }
        } catch (error) {
            console.error('Failed to load cart:', error);
        } finally {
            setIsLoaded(true)
        }
    }

    const saveCart = async () => {
        try {
            await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cartItems))
        } catch (error) {
            console.error('Failed to save cart:', error);
        }
    }

    const addItem = (product: Product, quantity: number) => {
        dispatch({ type: CartActionType.AddItem, payload: { product, quantity } })
    }

    const removeItem = (productId: number) => {
        dispatch({ type: CartActionType.RemoveItem, payload: { productId } })
    }

    const updateQuantity = (productId: number, quantity: number) => {
        dispatch({ type: CartActionType.UpdateQuantity, payload: { productId, quantity } })
    }

    const checkout = () => {
        dispatch({ type: CartActionType.CheckOut })
    }

    const totalPrice = state.cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity, 0
    )

    const totalItems = state.cartItems.reduce(
        (total, item) => total + item.quantity, 0
    )

    return (
        <CartContext.Provider value={{
            cartItems: state.cartItems,
            addItem,
            removeItem,
            updateQuantity,
            checkout,
            totalItems,
            totalPrice,
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}