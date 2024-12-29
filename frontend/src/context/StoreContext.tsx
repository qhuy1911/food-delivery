import React from "react";
import {food_list} from "../assets/assets";

type Food = {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
};

type CartItems = {
  [key: string]: number;
};

type StoreContextValue = {
  food_list: Food[];
  cartItems: CartItems;
  setCartItems: React.Dispatch<React.SetStateAction<CartItems>>;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
};

export const StoreContext = React.createContext<StoreContextValue | null>(null);

type StoreContextProviderProps = {
  children: React.ReactNode;
};

const StoreContextProvider: React.FC<StoreContextProviderProps> = ({
  children,
}) => {
  const [cartItems, setCartItems] = React.useState<CartItems>({});

  const addToCart = (itemId: string) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({...prev, [itemId]: 1}));
    } else {
      setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
    }
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
  };

  React.useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const contextValue: StoreContextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
