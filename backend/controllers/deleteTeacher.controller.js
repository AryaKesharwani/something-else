const { Teacher } = require("../models");
const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  const teacher = await Teacher.findByPk(id);
  if (teacher) {
    await teacher.destroy();
    res.json({ message: "Teacher deleted successfully" });
  } else {
    res.status(404).json({ error: "Teacher not found" });
  }
};

module.exports = deleteTeacher;
