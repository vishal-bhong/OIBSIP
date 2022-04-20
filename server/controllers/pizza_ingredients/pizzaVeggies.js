import PizzaVeggies from '../../models/pizza_ingredients/pizzaVeggies.js';
import mongoose from 'mongoose';


export const addVeggies = async (req, res) => {
    const post = req.body;

    const newVeggies = new PizzaVeggies({ ...post });

    try {
        await newVeggies.save();
        res.status(201).json(newVeggies);
    } catch (error) {
        res.status(409).json({ message: error });
    }
}

export const getVeggies = async (req, res) => { 
    try {
        const sauce = await PizzaVeggies.find();
                
        res.status(200).json(sauce);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteVeggies = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id : ${id}`);

    await PizzaVeggies.findByIdAndRemove(id);   

    res.json({ message : 'Veggies deleted successfully...'});
}