//mqtt
const express = require('express');
const mqtt = require('mqtt');
const cors = require('cors');

const app = express();
const port = 5000;

const mqttClient = mqtt.connect('mqtt://localhost');

app.use(cors());
app.use(express.json());

app.post('/send-message', (req, res) => {
    const { topic,message } = req.body;

    if (mqttClient.connected) {
        mqttClient.publish(topic, message);
        console.log(`Message published to MQTT on topic ${topic} : ${message}`); 
        res.send('Message sent to MQTT server');
    } else {
        res.status(500).send('MQTT client not connected');
    }
});

mqttClient.on('connect', function () {
    console.log('Connected to MQTT broker');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
