import express from "express";

import { getVarieties, addVarieties, deleteVarieties } from '../controllers/pizza_ingredients/pizzaVarietiesController.js';
import { getBases, addBases, deleteBases } from '../controllers/pizza_ingredients/pizzaBases.js';
import { addCheese, getCheese, deleteCheese } from '../controllers/pizza_ingredients/pizzaCheese.js';
import { addSauce, getSauce, deleteSauce } from '../controllers/pizza_ingredients/pizzaSauce.js';
import { addVeggies, getVeggies, deleteVeggies } from '../controllers/pizza_ingredients/pizzaVeggies.js';
import { addMeat, getMeat, deleteMeat } from '../controllers/pizza_ingredients/pizzaMeat.js';


const router = express.Router();

router.post('/add_varieties', addVarieties);
router.post('/add_bases', addBases);
router.post('/add_cheese', addCheese);
router.post('/add_sauce', addSauce);
router.post('/add_veggies', addVeggies);
router.post('/add_meat', addMeat);

router.get('/get_varieties', getVarieties);
router.get('/get_bases', getBases);
router.get('/get_cheese', getCheese);
router.get('/get_sauce', getSauce);
router.get('/get_veggies', getVeggies);
router.get('/get_meat', getMeat);

router.delete('/delete_varieties/:id', deleteVarieties);
router.delete('/delete_bases/:id', deleteBases);
router.delete('/delete_cheese/:id', deleteCheese);
router.delete('/delete_sauce/:id', deleteSauce);
router.delete('/delete_veggies/:id', deleteVeggies);
router.delete('/delete_meat/:id', deleteMeat);

export default router;
