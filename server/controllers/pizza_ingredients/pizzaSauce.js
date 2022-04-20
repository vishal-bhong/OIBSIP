import PizzaSauce from '../../models/pizza_ingredients/pizzaSauce.js';
import mongoose from 'mongoose';


export const addSauce = async (req, res) => {
    const post = req.body;

    const newSauce = new PizzaSauce({ ...post });

    try {
        await newSauce.save();
        res.status(201).json(newSauce);
    } catch (error) {
        res.status(409).json({ message: error });
    }
}

export const getSauce = async (req, res) => { 
    try {
        const sauce = await PizzaSauce.find();
                
        res.status(200).json(sauce);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteSauce = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id : ${id}`);

    await PizzaSauce.findByIdAndRemove(id);   

    res.json({ message : 'Sauce deleted successfully...'});
}