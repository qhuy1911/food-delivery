import React from "react";
import "./FoodItem.css";
import {assets} from "../../assets/assets";
import {StoreContext} from "../../context/StoreContext";

type FoodItemProps = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

const FoodItem = ({id, name, price, description, image}: FoodItemProps) => {
  const {cartItems, addToCart, removeFromCart, url} =
    React.useContext(StoreContext)!;

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={`${url}/images/${image}`}
          alt={`Image item ${id}`}
        />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt={`Add icon white ${id}`}
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt={`Remove icon red ${id}`}
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt={`Add icon green ${id}`}
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt={`Rating starts ${id}`} />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
