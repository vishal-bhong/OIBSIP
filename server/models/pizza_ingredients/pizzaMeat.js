import mongoose from 'mongoose';

const meatSchema = mongoose.Schema({
    name: { type: String, required: true },  
    message : { type: String, required: true },
    selectedFile : { type: String, required: true },
    availableCount : { type: String, required: true },
    cost : { type: Number, required: true }
})

var PizzaMeat = mongoose.model('PizzaMeat', meatSchema);

export default PizzaMeat;