const { Op } = require("sequelize");
const { Teacher } = require("../models");
const filterTeachers = async (req, res) => {
  const { minAge, maxAge, minClasses, maxClasses } = req.query;

  let whereClause = {};

  if (minAge !== undefined || maxAge !== undefined) {
    whereClause.age = {};
    if (minAge !== undefined) whereClause.age[Op.gte] = parseInt(minAge);
    if (maxAge !== undefined) whereClause.age[Op.lte] = parseInt(maxAge);
  }

  if (minClasses !== undefined || maxClasses !== undefined) {
    whereClause.numClasses = {};
    if (minClasses !== undefined)
      whereClause.numClasses[Op.gte] = parseInt(minClasses);
    if (maxClasses !== undefined)
      whereClause.numClasses[Op.lte] = parseInt(maxClasses);
  }

  try {
    const teachers = await Teacher.findAll({ where: whereClause });
    res.json(teachers);
  } catch (error) {
    console.error("Error in teacher filtering:", error);
    res
      .status(500)
      .json({ error: "An error occurred while filtering teachers" });
  }
};

module.exports = filterTeachers;
