import axios from "axios";
import React, {useState} from "react";

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
  const [foodList, setFoodList] = useState<Food[]>([]);

  const addToCart = async (itemId: string) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({...prev, [itemId]: 1}));
    } else {
      setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
    }
    if (token) {
      await axios.post(
        `${url}/api/cart/add`,
        {itemId},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };

  const removeFromCart = async (itemId: string) => {
    setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        {itemId},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = foodList.find((product) => product._id === item)!;
        totalAmount += itemInfo?.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data);
  };

  const loadCartData = async (token: string) => {
    const response = await axios.get(`${url}/api/cart/get`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    setCartItems(response.data.cartData);
  };

  React.useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const localStorageToken = localStorage.getItem("token") || "";
      if (localStorageToken) {
        setToken(localStorageToken);
        await loadCartData(localStorageToken);
      }
    }
    loadData();
  }, []);

  const contextValue: StoreContextValue = {
    food_list: foodList,
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
