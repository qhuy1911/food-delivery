import {Request, Response} from "express";
import userModel from "../models/userModel";

// add items to user cart
const addToCart = async (req: Request, res: Response) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    const cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, {cartData});
    res.json({success: true, message: "Added To Cart"});
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error when adding to cart"});
  }
};

// remove items from user cart
const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    const cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, {cartData});
    res.json({success: true, message: "Removed From Cart"});
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error when removing from cart"});
  }
};

// fetch user cart data
const getCart = async (req: Request, res: Response) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    const cartData = await userData.cartData;
    res.json({success: true, cartData});
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error when getting cart"});
  }
};

export {addToCart, removeFromCart, getCart};
