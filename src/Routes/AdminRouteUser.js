import express from "express";
import User from "../Models/User.js";
import Robot from "../Models/Robot.js"; 
import { verifyAdminToken } from "../Middleware/auth.js";

const router = express.Router();

//Route to get user details associated with a user's email
router.get("/admin/user", verifyAdminToken, async (req, res) => {
  try {
    const { email } = req.query;
    
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Route to get robot details associated with a user's email
router.get("/admin/robots", verifyAdminToken, async (req, res) => {
  try {
    const { emailId } = req.query;

    // Find robots associated with the user's email
    const robots = await Robot.find({ emailId: emailId }); // Assuming `userEmail` is a field in the Robot model

    if (!robots || robots.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No robots found for this email" });
    }

    return res.status(200).json({ success: true, robots });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});
export default router;
