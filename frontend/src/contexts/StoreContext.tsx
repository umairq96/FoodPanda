import { createContext, ReactNode, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

// Define the type for your context value
interface StoreContextType {
  food_list: any;
  cartItems: any;
  setCartItems: (category: any | ((prev: any) => any)) => void;
  addToCart: (itemId: number) => void;
  removeFromCart: (itemId: number) => void;
  getTotalCartAmount: () => number
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

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for(const item in cartItems) {
      if(cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        
        if(itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
        else {
          console.warn(`Item with _id ${item} not found in food_list.`)
        }
      }
    }

    return totalAmount;
  }

  const contextValue: StoreContextType = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
