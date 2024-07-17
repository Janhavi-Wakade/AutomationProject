const mongoose = require('mongoose');
const Button = require('./models/Buttonschema');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');

    const initialButtonStates = [
            {"idschema": "1a", "state": "OFF"},
            {"idschema": "2a", "state": "OFF"},
            {"idschema": "3a", "state": "OFF"},
            {"idschema": "1b", "state": "OFF"},
            {"idschema": "2b", "state": "OFF"},
            {"idschema": "3b", "state": "OFF"}
    ];

    Button.insertMany(initialButtonStates)
    .then(() => {
        console.log('Initial button states inserted successfully');
        mongoose.connection.close(); 
    })
    .catch(err => {
        console.error('Error inserting initial button states:', err);
        mongoose.connection.close();
    });
})
.catch(err => console.error('Error connecting to MongoDB:', err));
