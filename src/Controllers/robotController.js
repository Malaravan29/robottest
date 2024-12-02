import Robot from "../Models/Robot.js";

export const getRobotsByEmail = async (req, res) => {
  try {
    const { email: tokenEmail, role } = req.user; // Extract email and role from token
    const { email } = req.query; // Retrieve email from query params

    let robots;

    if (role === "user") {
      // Ensure the query email matches the token email for users
      if (!email || email !== tokenEmail) {
        return res.status(403).json({ message: "Access denied" });
      }
      robots = await Robot.find({ emailId: email }).exec();
    } else if (["Hr", "AdminController", "ProjectManager"].includes(role)) {
      // Fetch robots based on query email or all robots if no email is provided
      robots = email
        ? await Robot.find({ emailId: email }).exec()
        : await Robot.find().exec();
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
