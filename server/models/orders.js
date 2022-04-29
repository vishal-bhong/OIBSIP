import mongoose from "mongoose";

const orderSchema= mongoose.Schema({
    Pizza_Variety: { type: Array },
    Base: { type: Array },
    Sauce: { type: Array },
    Cheese: { type: Array },
    Veggies: { type: Array },
    name: { type: String, required: true },
    email: { type: String, required: true },
    userId: { type: String, required: true },
    mobileNo: { type: String, required: true },
    status: { type: String, required: true },
    amountPaid: { type: Number, requred: true },
    type: { type: String, required: true },  
});

export default mongoose.model("Orders", orderSchema);
