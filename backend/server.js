import path from "path";
import express from "express";
import multer from "multer";
import fs from "fs";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import specRoutes from "./routes/specRoutes.js";
import stateRoutes from "./routes/stateRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import newdropRoutes from "./routes/newdropRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import taxRoutes from "./routes/taxRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import contactusRoutes from "./routes/contactusRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import colorRoutes from "./routes/colorRoutes.js";
import bagsizeRoutes from "./routes/bagsizeRoutes.js";
import materialRoutes from "./routes/materialRoutes.js";
import homecategoryRoutes from "./routes/homecategoryRoutes.js";
import hotdealsRoutes from "./routes/hotdealsRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import wolfpackRoutes from "./routes/wolfpackRoutes.js";


// import { View } from "grandjs";
import pkg from 'grandjs';
const { View } = pkg;
View.settings.set("views", "./views");

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/homecategory", homecategoryRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/specs", specRoutes);
app.use("/api/state", stateRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/color", colorRoutes);
app.use("/api/bagsize", bagsizeRoutes);
app.use("/api/material", materialRoutes);
app.use("/api/hotdeal", hotdealsRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/newdrop", newdropRoutes);
app.use("/api/wolfpackregistraion",wolfpackRoutes )

app.use("/api/upload", uploadRoutes);
app.use("/api/tax", taxRoutes);
app.use("/api/contactus", contactusRoutes);
app.use("/api/RequestQuote", quoteRoutes);
app.use("/api/subscriber", subscriberRoutes);
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  // app.use(express.static(path.join(__dirname, "/admin/build")));

  // app.get("/admin", (req, res) =>
  //   res.sendFile(path.resolve(__dirname, "adminend", "build", "index.html"))
  // );
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
