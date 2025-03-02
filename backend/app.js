const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();

// Enable CORS for all requests
app.use(cors());


// Increase request size limit
app.use(express.json({ limit: "10mb" })); // Allow up to 10MB JSON payloads
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Increase form limit
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errors");

app.use(cookieParser());
app.use(bodyParser.json());


// Middleware


// Routes
const bookRoute = require("./Router/bookRoute");
app.use("/api", bookRoute);

app.use(errorHandler);

module.exports = app;
