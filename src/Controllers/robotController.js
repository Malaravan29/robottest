import Robot from "../Models/Robot.js";

export const getRobotsByEmail = async (req, res) => {
  try {
    const { email, role } = req.user; // Assuming email and role are extracted from the verified token
    const queryEmail = req.query.email; // Extract the email query parameter if provided

    let robots;

    if (role === "user") {
      // Fetch robots for a specific user based on their email
      robots = await Robot.find({ emailId: email }).exec();
    } else if (["Hr", "AdminController", "ProjectManage"].includes(role)) {
      // Fetch robots based on the query email if provided, otherwise fetch all
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
