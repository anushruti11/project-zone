const express = require("express");
const projectsRouter = express.Router();
const Project = require("../db/schema/projectSchema");
const { sendemail, ResetPassword } = require("./../controllers/user");

projectsRouter.get("/getprojects", async (req, res) => {
  const query = req.query.q;

  try {
    const result = await Project.find({
      skills: { $regex: query, $options: "i" },
    });
    // console.log(result);

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.log(err);
  }

  return res.staus(500).json({ message: "Internal server error" });
});

projectsRouter.post("/send-forgetpassword-email", sendemail);
projectsRouter.post("/reset-password" , ResetPassword);

module.exports = projectsRouter;
