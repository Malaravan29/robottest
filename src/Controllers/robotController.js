export const getRobotsByEmail = async (req, res) => {
  try {
    // Extract email from req.params, req.query, or req.user (priority order)
    const email = req.params.email || req.query.email || req.user?.email;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find robots associated with the provided email
    const robots = await robots.find({ emailId: email }).exec();

    if (!robots || robots.length === 0) {
      return res.status(404).json({ message: "No robots found for this user" });
    }

    return res.json(robots);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
