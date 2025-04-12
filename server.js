const express = require('express');
const connectDb = require('./db/config');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
connectDb();

app.use(cors());
app.use(express.json());


app.use('/api', require('./routes/Api'));


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server running on port", port);
});
