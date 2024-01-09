import express from "express";
import mongoose from "mongoose";

import { router } from "./router";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use("/api", router);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://root:root@cluster0.oq3wee8.mongodb.net/?retryWrites=true&w=majority",
    );
    app.listen(PORT, () => {
      console.log("Success! Server started on port " + PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
