const express = require("express");
const mongoModel = require("./model/mongoModel");

const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/CRUD";

const app = express();

// Connect to MongoDB
mongoose .connect(
    "mongodb+srv://fa20bse008:fa20bse008@cluster0.1sfpbsf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  mongoose.connect('YOUR_COMPASS_CONNECTION_STRING', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Middleware
app.use(express.json());
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Create
app.post("/create", async (req, res) => {
  try {
    const { name, color } = req.body;
    const doc = new mongoModel({ name, color });
    const result = await doc.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read
app.get("/read", async (req, res) => {
  try {
    const docs = await mongoModel.find();
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/read/:id", async (req, res) => {
  try {
    const doc = await mongoModel.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
app.put("/update/:id", async (req, res) => {
  try {
    const { name, color } = req.body;
    const doc = await mongoModel.findByIdAndUpdate(
      req.params.id,
      { name, color },
      { new: true }
    );
    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
app.delete("/delete/:id", async (req, res) => {
  try {
    const doc = await mongoModel.findByIdAndDelete(req.params.id);
    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
