import PizzaVarieties from '../../models/pizza_ingredients/pizzaVarieties.js';
import mongoose from 'mongoose';

export const getVarieties = async (req, res) => { 
    try {
        const newVarieties = await PizzaVarieties.find();
                
        res.status(200).json(newVarieties);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addVarieties = async (req, res) => {
    const post = req.body;

    const newVarieties = new PizzaVarieties({ ...post });

    try {
        await newVarieties.save();
        res.status(201).json(newVarieties);
    } catch (error) {
        res.status(409).json({ message: error });
    }
}

export const deleteVarieties = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id : ${id}`);

    await PizzaVarieties.findByIdAndRemove(id);   

    res.json({ message : 'Pizza variety deleted successfully...'});
}