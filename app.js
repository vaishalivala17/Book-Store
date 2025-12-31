const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/bookDB")
.then(() => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// static folders
app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));

app.use("/", bookRoutes);

app.listen(3000, (err) => {
    if(!err) {
        console.log("Server running on http://localhost:3000");
    } else {
        console.error("Error starting server:", err);
    }
});
