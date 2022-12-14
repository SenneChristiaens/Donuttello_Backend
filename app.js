const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.set('strictQuery', false);

mongoose.connect(
  "mongodb+srv://Senne:cfYv2FQsV4q7Ov7v@donuttello.jpv1i8d.mongodb.net/donuttello?retryWrites=true&w=majority"
);

const donutsRouter = require("./routes/donuts");
const adminsRouter = require("./routes/admins");

const app = express();

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


app.use("/api/v1/donuts", donutsRouter);
app.use("/api/v1/admins", adminsRouter);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
