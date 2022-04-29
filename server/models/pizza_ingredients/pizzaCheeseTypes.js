import mongoose from 'mongoose';

const cheeseSchema = mongoose.Schema({
    name: { type: String, required: true },  
    message : { type: String, required: true },
    selectedFile : { type: String, required: true },
    availableCount : { type: String, required: true },
    cost : { type: Number, required: true }
})

var PizzaCheese = mongoose.model('PizzaCheese', cheeseSchema);

export default PizzaCheese;