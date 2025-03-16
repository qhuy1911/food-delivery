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
  getTotalCartAmount: () => number;
  url: string;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

export const StoreContext = React.createContext<StoreContextValue | null>(null);

type StoreContextProviderProps = {
  children: React.ReactNode;
};

const StoreContextProvider: React.FC<StoreContextProviderProps> = ({
  children,
}) => {
  const [cartItems, setCartItems] = React.useState<CartItems>({});
  const url = "http://localhost:4000";
  const [token, setToken] = React.useState<string>("");

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

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item)!;
        totalAmount += itemInfo?.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token") || "");
    }
  }, []);

  const contextValue: StoreContextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
