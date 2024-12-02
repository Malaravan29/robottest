import Robot from "../Models/Robot.js";

export const getRobotsByEmail = async (req, res) => {
  try {
    // Extract email from req.user or req.query
    const email = req.user?.email || req.query.email;

    // Validate if email exists
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Query the database for robots associated with the email
    const robots = await Robot.find({ emailId: email }).exec();

    // Check if robots exist
    if (!robots || robots.length === 0) {
      return res.status(404).json({ message: "No robots found for this user" });
    }

    // Respond with robots
    return res.json(robots);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
