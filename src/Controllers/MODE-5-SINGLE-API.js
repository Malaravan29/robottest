import OneModeModel from "../Models/5MODE-SINGLE-MODEL.js";

const modeConfig = {
  INITIALIZATION_MODE: {
    modeName:"Initialization", 
    fields: ["mode", "emailId", "robotId", "position", "orientation","status"],
    model: OneModeModel,
  },
  MANUAL_MODE: {
    modeName:"ManualMapping", 
    fields: ["mode", "emailId", "robotId", "map_name","subLocation", "position", "orientation","status"],
    model: OneModeModel,
  },
  AUTO_DISINFECTION_MODE: {
    modeName:"AutoDisinfection",
    fields: ["mode", "emailId", "robotId", "map_name","subLocation", "position", "orientation", "perimeter", "object_name", "total_object", "completed_object","status"],
    model: OneModeModel,
  },
  OBJECT_DISINFECTION_MODE: {
    modeName:"ObjectDisinfection",
    fields: ["mode", "emailId", "robotId", "map_name", "subLocation","position", "orientation", "total_object","object_name","completed_object","status"],
    model: OneModeModel,
  },
  AUTO_DOCKING_MODE: {
    modeName:"AutoDocking", 
    fields: ["mode", "emailId", "robotId", "map_name","subLocation", "position", "orientation", "docking","status"],
    model: OneModeModel,
  }
};

//save history

export const singleFiveModeApi = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mode } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not found." });
    }

    
    if (!mode) {
      return res.status(400).json({
        message: "Missing mode parameter. Please provide a valid mode."
      });
    }


    const modeKey = Object.keys(modeConfig).find(key => modeConfig[key].modeName === mode);

   
    if (!modeKey) {
      const validModes = Object.keys(modeConfig).map(key => modeConfig[key].modeName).join(", ");
      return res.status(400).json({
        message: `Invalid mode provided: "${mode}". Valid modes are: ${validModes}`
      });
    }

    const { fields, model, modeName } = modeConfig[modeKey];

    const missingFields = fields.filter(field => req.body[field] === undefined);
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields.",
        missingFields: missingFields,
      });
    }

    const modeData = fields.reduce((data, field) => {
      data[field] = req.body[field];
      return data;
    }, { userId }); 

    const result = await model.create(modeData);
    return res.status(201).json({ message: `${modeName} data saved successfully.`, data: result });

  } catch (error) {
    console.error("Error saving mode data:", error);
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// get history 

export const getModeRobotId = async (req, res) => {
  try {
    const { email } = req.user; // Extract email from verified token

    // Query the database for records matching the email
    const records = await OneModeModel.find({ emailId: email });

    if (!records || records.length === 0) {
      return res.status(404).json({ message: "No records found for the specified email" });
    }

    return res.status(200).json(records);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
 }
};