const { Teacher } = require("../models");
const { Sequelize } = require("sequelize");
const searchTeachers = async (req, res) => {
  const { name } = req.query;
  try {
    const teachers = await Teacher.findAll({
      where: Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("fullName")),
        "LIKE",
        "%" + name.toLowerCase() + "%"
      ),
      limit: 10,
    });
    res.json(teachers);
  } catch (error) {
    console.error("Error in teacher search:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for teachers" });
  }
};

module.exports = searchTeachers;
