import Orders from '../models/orders.js';
import mongoose from 'mongoose';


export const addOrder = async (req, res) => {
    const orderPost = req.body;

    const newOrder = new Orders({ ...orderPost });

    console.log(newOrder);

    try {
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(409).json({ message: error });
    }
}

export const getOrders = async (req, res) => { 
    try {
        const orders = await Orders.find();
                
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const deleteOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id : ${id}`);

    await Orders.findByIdAndRemove(id);   

    res.json({ message : 'order cancelled successfully...'});
}

export const getMyOrders = async (req, res) => {
     const { userId } = req.params;

     const userOrders = await Orders.find({ userId });

     res.status(200).json(userOrders);
}

export const updateOrderStatus = async (req, res) => {
    const { id, status } = req.body;

    const existingOrder = await Orders.findOne({ _id: id });

    existingOrder.status = status;

    const updatedOrder = await existingOrder.save();

    res.status(200).json({ message: `status changed successfully... to ${updatedOrder.status}`, updatedOrder });
}