import mongoose from 'mongoose';

const sauceSchema = mongoose.Schema({
    name: { type: String, required: true },  
    message : { type: String, required: true },
    selectedFile : { type: String, required: true },
    availableCount : { type: String, required: true },
})

var PizzaSauce = mongoose.model('PizzaSauce', sauceSchema);

export default PizzaSauce;