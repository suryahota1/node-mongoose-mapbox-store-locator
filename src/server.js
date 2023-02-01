const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const storeRoute = require("./routes/store");
const connectDB = require("./db");

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/stores", storeRoute);

connectDB();

app.listen(PORT, () => console.log("Server running in " + process.env.NODE_ENV + " mode on port " + PORT));
