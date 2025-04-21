const express = require('express');
const connectDb = require('./db/config');  // Assuming this is where you handle your MongoDB connection
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const staffRoutes = require('./routes/staffRoutes');
const loginApi = require('./routes/LoginApi');
dotenv.config();

const app = express();

// Call the custom database connection function (already in your config)
connectDb();  // Ensure that this function is handling the MongoDB connection

app.use(cors());
app.use(express.json());
app.use('/api/login', loginApi);
app.use(bodyParser.json());
app.use('/admin', staffRoutes); 
app.use('/api', require('./routes/Api'));
// Use staff routes
app.use('/api', staffRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server running on port", port);
});
