import Express, { application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import * as socket from 'socket.io';

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
const CONNECTION_URL = 'mongodb://localhost:27017/Pizza_Delivery_Application';

var httpServer = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect(CONNECTION_URL)
    .catch((error) => console.log(error.message));


const io = new socket.Server(httpServer, { cors: { origin: 'http://localhost:3000', }, });

let onlineClients = [];

const addNewUser = (userName, fullName, mobile, userId, socketId) => {
   !onlineClients.some((user) => user.userId === userId) &&
     onlineClients.push({ userName, fullName, mobile, userId, socketId });
 };

const removeUser = (socketId) => {
   onlineClients = onlineClients.filter((user) => user.socketId !== socketId);
 };

const getUser = (userName) => {
   return onlineClients.find((user) => user.userName === userName);
 };

io.on("connection", (socket) => {

   socket.on("newUser", ({ userName, fullName, mobile, userId }) => {
       addNewUser(userName, fullName, mobile, userId, socket.id);
       console.log('user connected');
       console.log(onlineClients);
   });    

   socket.on("Status", ({ senderUserName, receiverUserName, status })=> {
       //const receiver = getUser(receiverUserName);
       console.log(senderUserName, receiverUserName, status)
    //    io.to(receiver.socketId).emit("getNotification", {
    //        senderName,
    //        type,
    //    });
   });

    socket.on("disconnect", () =>{
        removeUser(socket.id);
        console.log('user disconnected')         
    });
});

