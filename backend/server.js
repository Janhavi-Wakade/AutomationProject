//both mongoose and mqtt
const express = require('express');
const mongoose = require('mongoose');
const mqtt = require('mqtt');
const cors = require('cors');
const Button = require('./models/Buttonschema');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const mqttBrokerUrl = 'mqtt://172.20.10.7';

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Error connecting to MongoDB:', err));

const mqttClient = mqtt.connect(mqttBrokerUrl);

mqttClient.on('connect', function () {
    console.log('Connected to MQTT broker');

    client.subscribe('lightswitch1');
    client.subscribe('lightswitch2');
    client.subscribe('lightswitch3');
});

//for incoming messages
// mqttClient.on('message', async function (topic, message) {
//     console.log(`Received message on topic: ${topic}`);
//     const state = message.toString();

//     // Update MongoDB based on topic
//     let idschema;
//     switch (topic) {
//         case 'lightswitch1':
//             idschema = '1a'; 
//             break;
//         case 'lightswitch2':
//             idschema = '2a'; 
//             break;
//         case 'lightswitch3':
//             idschema = '3a'; 
//             break;
//         default:
//             console.log(`Unknown topic: ${topic}`);
//             return;
//     }

//     try {
//         const updatedButton = await Button.findOneAndUpdate(
//             { idschema: idschema },
//             { state: state },
//             { new: true }
//         );
//         res.json(updatedButton);
//         console.log(`Updated button ${idschema} state to ${state}`);
//     } catch (error) {
//         console.error('Error updating button state:', error);
//     }
// });

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.put('/api/buttons/:idschema', async (req, res) => {
    const { idschema } = req.params; // Get idschema from URL params
    const { state } = req.body; // Get state from request body

    try {
        const updatedButton = await Button.findOneAndUpdate(
            { idschema: idschema }, 
            { state: state }, 
            { new: true } 
        );

        if(idschema=='1a')
            mqttClient.publish('lightswitch1', state);

        if(idschema=='2a')
            mqttClient.publish('lightswitch2', state);

        if(idschema=='3a')
            mqttClient.publish('lightswitch3', state);
        
        console.log(`Updated button ${idschema} state to ${state}`);
        res.json(updatedButton);
    } catch (error) {
        console.error('Error updating button state:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


app.get('/api/buttons', async (req, res) => {
    try {
      const buttons = await Button.find(); // Fetch all buttons from MongoDB
      res.json(buttons); // Send the buttons as JSON response
    
    } catch (err) {
      console.error('Error fetching buttons:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('/api/button/:buttonId', async (req, res) => {
    const { buttonId } = req.params;
    try {
        const button = await Button.findOne({idschema:buttonId});
        console.log("button state:",button);
        if (!button) {
            return res.status(404).json({ error: 'Button state not found' });
        }

        res.json(button);
    } catch (error) {
        console.error('Error retrieving button state:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});