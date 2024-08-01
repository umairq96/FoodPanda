import { createContext, ReactNode, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

// Define the type for your context value
interface StoreContextType {
  food_list: any;
  cartItems: any;
  setCartItems: (category: any | ((prev: any) => any)) => void;
  addToCart: (itemId: number) => void;
  removeFromCart: (itemId: number) => void;

}

interface CartItemsType {
  [key: number]: number;
}

// Create the context with a null default value
export const StoreContext = createContext<StoreContextType | undefined>(
  undefined
);

interface StoreContextProviderProps {
  children: ReactNode;
}

const StoreContextProvider: React.FC<StoreContextProviderProps> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItemsType>({});

  const addToCart = (itemId: number) => {
    if(!cartItems[itemId]){
      setCartItems((prev) => ({...prev, [itemId]:1}))
    }
    else {
      setCartItems((prev) => ({...prev,[itemId]:prev[itemId] + 1}))
    }
  }

  const removeFromCart = (itemId: number) => {
    setCartItems((prev) => ({...prev,[itemId]:prev[itemId] - 1}))
  }

  useEffect(() => {
    console.log(cartItems);
  },[cartItems])

  const contextValue: StoreContextType = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
