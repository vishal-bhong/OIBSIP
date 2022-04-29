import Orders from '../models/orders.js';
import mongoose from 'mongoose';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import nodemailer from 'nodemailer';



let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: '**********',
      pass: '**********',
    },
  });


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


export const paymentOrder = async (req, res) => {
	try {
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
            
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
}


export const verifyPayment = async (req, res) => {
	try {
		const { response, pizzaOrder } = req.body;
		console.log(response);
		console.log(pizzaOrder);

		const sign = response.razorpay_order_id + "|" + response.razorpay_payment_id;

		const expectedSign = crypto
			.createHmac("sha256", process.env.KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (response.razorpay_signature === expectedSign) {

			if(pizzaOrder.type !== 'pizza_variety') { pizzaOrder.type = 'custom_pizza' }

			const newOrder = new Orders({ ...pizzaOrder });
			console.log(newOrder);
			
			try {
				await newOrder.save();

				let mailMessage = {
					to: `${newOrder.email}`,
				   subject: `your order for ${newOrder.type}: `,
				   html: "<h3>your order successfully placed for</h3>"  + "<h3 style='font-weight:bold; color:blue;'>" + newOrder.type +'</h3>'+ "<h1 style='font-weight:bold;'>" + newOrder.Pizza_Variety + '<br>' + newOrder.Base + '<br>' + newOrder.Sauce + '<br>' + newOrder.Cheese + '<br>' + newOrder.Veggies +"</h1>"
				 };

				 transporter.sendMail(mailMessage)

			} catch (err) {

			}

			return res.status(200).json({ message: "Payment verified successfully", orderDetails: newOrder });

		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
}