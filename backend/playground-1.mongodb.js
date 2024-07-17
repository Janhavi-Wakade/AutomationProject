use('state');

// Insert a few documents into the sales collection.
db.getCollection('switch').insertMany([
    {"id": 1, "state": "OFF"},
    {"id": 2, "state": "OFF"},
    {"id": 3, "state": "OFF"},
    {"id": 4, "state": "OFF"},
    {"id": 5, "state": "OFF"},
    {"id": 6, "state": "OFF"},
]);
// Print a message to the output window.
console.log(`done inserting data`);
