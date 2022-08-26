const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const path = require("path")
require("dotenv").config()
const db = require("./configdb/index")
const cors =require("cors")


db.connect()

app.use(cors())
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoose.connect('mongodb://localhost:27017/TKN_EDUCATION').then(()=> console.log("CONNECT SUCCESS")).catch((err)=>console.log(err));


// mongoose.connect('mongodb+srv://Duhocsinhmy132:Duhocsinhmy132@cluster0.zjqfxc2.mongodb.net/blog?retryWrites=true&w=majority'
// ).then(()=> console.log("CONNECT SUCCESS")).catch((err)=>console.log(err))




app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT ||  3000, () => {
    console.log("CONNECT THANH CONG TRANG WEB...")
})