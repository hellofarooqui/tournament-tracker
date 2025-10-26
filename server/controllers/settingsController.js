import TournamentFormat from "../models/TournamentFormat.js";

export const addTournamentFormat = async (req, res) => {
    const { name, description, rules } = req.body;
  
    if (!name || !description || !rules) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const newFormat = new TournamentFormat({ name, description, rules });
      await newFormat.save();
      res.status(201).json(newFormat);
    } catch (error) {
      console.error("Error adding tournament format:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  export const getTournamentFormats = async (req, res) => {
    try {
      const formats = await TournamentFormat.find();
      res.status(200).json(formats);
    } catch (error) {
      console.error("Error fetching tournament formats:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  