import PizzaMeat from '../../models/pizza_ingredients/pizzaMeat.js'
import express from 'express';
import mongoose from 'mongoose';


export const addMeat = async (req, res) => {
    const post = req.body;

    const newMeat = new PizzaMeat({ ...post });

    try {
        await newMeat.save();
        res.status(201).json(newMeat);
    } catch (error) {
        res.status(409).json({ message: error });
    }
}

export const getMeat = async (req, res) => { 
    try {
        const meat = await PizzaMeat.find();
                
        res.status(200).json(meat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteMeat = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id : ${id}`);

    await PizzaMeat.findByIdAndRemove(id);   

    res.json({ message : 'Meat deleted successfully...'});
}