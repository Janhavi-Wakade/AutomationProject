const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
  idschema: {
    type: String
  },
  state: {
    type: String,
    required: true
  }
});
const Button= mongoose.model('Button', newSchema);
module.exports = Button; 