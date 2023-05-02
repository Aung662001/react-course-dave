import { ReactNode, createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import useLocalStorage from "../hooks/useLocalStorage";
interface ShoppingCartContextProps {
  children: ReactNode;
}
interface CartItem {
  id: number;
  quantity: number;
}
export interface ShoppingCartContext {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartItems: CartItem[];
  openCart: () => void;
  closeCart: () => void;
}
export const CartContext = createContext({} as ShoppingCartContext);
export function useShoppingCart() {
  return useContext(CartContext);
}

export function ShoppingCartContext({ children }: ShoppingCartContextProps) {
  const [openCanv, setOpenCanv] = useState<boolean>(false);
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  function increaseCartQuantity(id: number) {
    setCartItems((currentItem) => {
      if (currentItem.find((item) => item.id === id) === undefined) {
        return [...currentItem, { id, quantity: 1 }];
      } else {
        return currentItem.map((item) => {
          if (item.id === id) {
            return { id, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(id: number) {
    setCartItems((currentItem) => {
      if (currentItem.find((item) => item.id === id)?.quantity === 1) {
        return currentItem.filter((item) => item.id !== id);
      } else {
        return currentItem.map((item) => {
          if (item.id === id) {
            return { id, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(id: number) {
    setCartItems((currentItem) => {
      return currentItem.filter((item) => item.id !== id);
    });
  }
  function openCart() {
    setOpenCanv(true);
  }
  function closeCart() {
    setOpenCanv(false);
  }
  console.log(typeof increaseCartQuantity);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shop-item",
    []
  );
  console.log(cartItems);
  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart open={openCanv} />
    </CartContext.Provider>
  );
}
