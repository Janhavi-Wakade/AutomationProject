
const express = require('express');
const router = express.Router();
const { getDB } = require('../db');

router.get('/:id', async (req, res) => {
    const db = getDB();
    const id = req.params.id;
    try {
        const button = await db.collection('buttons').findOne({ id });
        res.json(button || { id, state: 'OFF' });
    } catch (error) {
        console.error('Error retrieving button state:', error);
        res.status(500).json({ error: 'Failed to retrieve button state' });
    }
});

router.post('/:id', async (req, res) => {
    const { id } = req.params;
    const { newState } = req.body;
    const db = getDB();
    try {
        await db.collection('buttons').updateOne(
            { id },
            { $set: { state: newState } },
            { upsert: true }
        );
        res.status(200).send('Button state updated');
    } catch (error) {
        console.error('Error updating button state:', error);
        res.status(500).json({ error: 'Failed to update button state' });
    }
});

module.exports = router;
