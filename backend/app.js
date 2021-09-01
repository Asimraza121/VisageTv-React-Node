const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const cors = require("cors");
const dotenv = require("dotenv");

const adminRoutes = require("./Routes/admin");
const userRoutes = require("./Routes/user");

const app = express();

dotenv.config({ path: "./.env" });

console.log("Mongo url", process.env.MONGO_DB_URI);

const db_url = process.env.MONGO_DB_URI;
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/picture", express.static("./uploads"));
app.use("/api/admin", adminRoutes);
app.use("/api", userRoutes);

// app.use("/", (req, res, next) => {
//   res.send("Visage Backend");
// });

// Handle Uncaught exceptions
// process.on("uncaughtException", (err) => {
//   console.log(`ERROR: ${err.message}`);
//   console.log("Shutting Down Server due to Uncaught Exception");
//   process.exit(1);
// });

// Handle Unhandled Promise rejections
// process.on("unhandledRejection", (err) => {
//   console.log(`ERROR: ${err.message}`);
//   // console.log(`ERROR: ${err.stack}`);
//   console.log("Shutting down the server due to Unhandled Promise rejection");
// });

mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Database Connected");
    app.listen(port, () => {
      console.log(`Server is running on PORT : ${port} .`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection ERROR :", error);
  });
