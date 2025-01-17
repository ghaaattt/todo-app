const express = require("express");
const Task = require("../models/Task"); // Assurez-vous que le modèle Task est bien défini
const router = express.Router();

// Créer une nouvelle tâche
router.post("/", async (req, res) => {
  console.log("Données reçues :", req.body); // Log des données reçues pour le débogage
  const { title, description } = req.body;

  // Validation des données
  if (!title || !description) {
    return res.status(400).json({ error: "Le titre et la description sont requis" });
  }

  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la création de la tâche" });
  }
});

// Récupérer toutes les tâches
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la récupération des tâches" });
  }
});

// Mettre à jour une tâche
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: "Tâche non trouvée" });
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la mise à jour de la tâche" });
  }
});

// Supprimer une tâche
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Tâche non trouvée" });
    }
    res.status(200).json({ message: "Tâche supprimée" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la suppression de la tâche" });
  }
});

// Marquer une tâche comme terminée ou non terminée
router.put("/:id/toggle-completed", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Tâche non trouvée" });
    }

    task.completed = !task.completed; // Inverser le statut de la tâche
    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la mise à jour du statut de la tâche" });
  }
});

// Exporter le routeur
module.exports = router;

