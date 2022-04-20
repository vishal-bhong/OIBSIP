import PizzaCheese from '../../models/pizza_ingredients/pizzaCheeseTypes.js';
import mongoose from 'mongoose';

export const addCheese = async (req, res) => {
    const post = req.body;

    const newCheese = new PizzaCheese({ ...post });

    try {
        await newCheese.save();
        res.status(201).json(newCheese);
    } catch (error) {
        res.status(409).json({ message: error });
    }
}

export const getCheese = async (req, res) => { 
    try {
        const cheese = await PizzaCheese.find();
                
        res.status(200).json(cheese);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteCheese = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id : ${id}`);

    await PizzaCheese.findByIdAndRemove(id);   

    res.json({ message : 'Cheese deleted successfully...'});
}

