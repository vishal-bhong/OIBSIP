import Express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = Express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = 5000;

app.listen(PORT, () => console.log(`server listing on port : ${PORT}`))

console.log(app);