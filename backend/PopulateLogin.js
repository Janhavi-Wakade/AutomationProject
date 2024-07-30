const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const User = require('./models/UserSchema'); 
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log('MongoDB connected');

    const initialCred = [
        { "username": "Admin", "password": "password" }
    ];

    // Hash password
    const hashedCred = await Promise.all(initialCred.map(async (cred) => {
        const hashedPassword = await bcrypt.hash(cred.password, 10); // Hash the password
        return { username: cred.username, password: hashedPassword };
    }));

    // Insert hashed passwords into MongoDB
    User.insertMany(hashedCred)
    .then(() => {
        console.log('Initial User states inserted successfully');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error inserting initial User states:', err);
        mongoose.connection.close();
    });
})
.catch(err => console.error('Error connecting to MongoDB:', err));
