const express = require('express');
const connectDb = require('./db/config');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
connectDb();

app.use(cors());
app.use(express.json());

// Route handler using api.js
app.use('/api/admin', require('./routes/LoginApi'));
 // <-- This now includes admin, user, etc.

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server running on port", port);
});
