import mongoose from 'mongoose';

const veggiesSchema = mongoose.Schema({
    name: { type: String, required: true },  
    message : { type: String, required: true },
    selectedFile : { type: String, required: true },
    availableCount : { type: String, required: true },
})

var PizzaVeggies = mongoose.model('PizzaVeggies', veggiesSchema);

export default PizzaVeggies;