import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://foodDelivery:z0d9HYneGT9s0Rxp@cluster0.0kl44.mongodb.net/food-del"
    )
    .then(() => console.log("DB Connected"));
};
