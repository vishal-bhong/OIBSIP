import PizzaBases from '../../models/pizza_ingredients/pizzaBases.js';
import express from 'express';
import mongoose from 'mongoose';


export const addBases = async (req, res) => {
    const basePost = req.body;

    const newBase = new PizzaBases({ ...basePost });

    try {
        await newBase.save();
        res.status(201).json(newBase);
    } catch (error) {
        res.status(409).json({ message: error });
    }
}

export const getBases = async (req, res) => { 
    try {
        const bases = await PizzaBases.find();
                
        res.status(200).json(bases);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const deleteBases = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id : ${id}`);

    await PizzaBases.findByIdAndRemove(id);   

    res.json({ message : 'Base deleted successfully...'});
}