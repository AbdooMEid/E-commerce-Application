process.on("uncaughtException", (err) => {
  console.error(`uncaughtException : ${err.message} || ${err.stack}`);
});
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const dbConnection = require("./src/database/dbConnection");
const ApiError = require("./src/utils/Error/ApiError");
const {
  globalErrorMiddlware,
} = require("./src/utils/Error/globalmiddlwareError");
dotenv.config({ path: "./config/config.env" });
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.NODE_ENV} `);
}

//connect database
dbConnection();
mongoose.set("strictQuery", false);
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

//Mount routes
app.use("/", require("./src/routes/index.routes"));
//handle error
app.all("*", (req, res, next) => {
  next(new ApiError(`cant found ${req.originalUrl}`, 404));
});

//handle server error
app.use(globalErrorMiddlware);
//server
const server = app.listen(PORT, () => {
  console.log(`server is runing ${PORT}.....`);
});

process.on("rejectionHandled", (err) => {
  console.error(`handleRejection : ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Showet Down.....");
    process.exit(1);
  });
});
