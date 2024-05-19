const mongoose = require("mongoose");

// Define a schema for your model
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

// Create a model based on the schema
const mongoModel = mongoose.model("mongoModel", schema);

// Export the model
module.exports = mongoModel;
