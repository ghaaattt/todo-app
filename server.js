const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Charger les variables d'environnement
dotenv.config();

// Initialiser l'application
const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.error("Erreur MongoDB :", err));

// Route simple pour tester
app.get("/", (req, res) => {
  res.send("Backend fonctionne !");
});

const taskRoutes = require("./routes/taskRoutes");

// Utiliser les routes pour les tâches
app.use("/api/tasks", taskRoutes);

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur en cours sur le port ${PORT}`));

