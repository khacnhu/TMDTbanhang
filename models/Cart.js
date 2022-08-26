
const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
    {
        userId: {type: String, require: true},
        product: [
            {
                productId:{
                    type:String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                }
            
            }
        ]
    },
    { timestamps: true }
)

module.exports = mongoose.model("Cart", CartSchema)

