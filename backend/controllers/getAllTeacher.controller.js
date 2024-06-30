const { Teacher } = require('../models');
const getAllTeacher = async (req, res) => {
  const teachers = await Teacher.findAll();
  return res.json(teachers);
};


module.exports = getAllTeacher;