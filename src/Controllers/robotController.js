import Robot from "../Models/Robot.js";

export const getRobotsByEmail = async (req, res) => {
  try {
    const { email: tokenEmail, role } = req.user; // Extract email and role from the token
    const { email: queryEmail } = req.query; // Extract email from query parameters

    let robots;

    if (role === "user") {
      // Fetch robots for a specific user based on their email from the token
      robots = await Robot.find({ emailId: tokenEmail }).exec();
    } else if (["Hr", "AdminController", "ProjectManage"].includes(role)) {
      // Fetch robots based on the query parameter or fetch all if no email is provided
      if (queryEmail) {
        robots = await Robot.find({ emailId: queryEmail }).exec();
      } else {
        robots = await Robot.find().exec();
      }
    } else {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!robots || robots.length === 0) {
      return res.status(404).json({ message: "No robots found" });
    }

    return res.json(robots);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
