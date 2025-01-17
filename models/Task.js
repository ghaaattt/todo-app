const mongoose = require("mongoose");

// Définir le schéma pour les tâches
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Exporter le modèle
module.exports = mongoose.model("Task", TaskSchema);