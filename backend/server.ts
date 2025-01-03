import express from "express";
import cors from "cors";
import {connectDB} from "./config/db";

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
