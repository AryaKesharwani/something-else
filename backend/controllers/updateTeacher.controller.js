const { Teacher } = require('../models');
const updateTeacher = async (req, res) => {
    const { id } = req.params;
    const { fullName, age, dateOfBirth, numClasses } = req.body;
    const teacher = await Teacher.findByPk(id);
    if (teacher) {
      await teacher.update({
        fullName,
        age,
        dateOfBirth,
        numClasses
      });
      res.json(teacher);
    } else {
      res.status(404).json({ error: 'Teacher not found' });
    }
  }

module.exports = updateTeacher;