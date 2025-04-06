const express = require('express');
const connectDb = require('./db/config');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
dotenv.config();

const app = express();
connectDb();
app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/Api'));

const port = 5000;
app.listen(port, () => {
    console.log("Server running on 5000");
});