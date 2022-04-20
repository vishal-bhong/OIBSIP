import Express, { application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';
import pizzaInventoryRoutes from './routes/pizzaInventory.js'

const app = Express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/inventory', pizzaInventoryRoutes);

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = 'mongodb://localhost:27017/Pizza_Delivery_Application'

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));