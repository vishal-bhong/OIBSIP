import mongoose from 'mongoose';

const varietiesSchema = mongoose.Schema({
    name: { type: String, required: true },   
    message : { type: String, required: true },
    selectedFile : { type: String, required: true },
    availableCount : { type: String },
    cost : { type: Number, required: true }
})

var PizzaVarieties = mongoose.model('PizzaVarieties', varietiesSchema);

export default PizzaVarieties;