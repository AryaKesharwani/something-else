const { Teacher } = require("../models");
const averageClassesPerTeacher = async (req, res) => {
  const result = await Teacher.findAll({
    attributes: [
      [sequelize.fn("avg", sequelize.col("numClasses")), "avgClasses"],
    ],
  });
  res.json(result[0]);
};


module.exports = averageClassesPerTeacher;