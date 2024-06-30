const { Teacher } = require("../models");
const addTeacher = async (req, res) => {
  const { fullName, age, dateOfBirth, numClasses } = req.body;
  const newTeacher = await Teacher.create({
    fullName,
    age,
    dateOfBirth,
    numClasses,
  });
  return res.json(newTeacher);
};

module.exports = addTeacher;
