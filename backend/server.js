require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const { Teacher, initializeDb } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors())

// Initialize the database
initializeDb().then(() => {
  console.log('Database initialized');
});

// Endpoint to show all teachers
app.get('/teachers', async (req, res) => {
  const teachers = await Teacher.findAll();
  res.json(teachers);
});

// Endpoint to add a teacher
app.post('/teachers', async (req, res) => {
  const { fullName, age, dateOfBirth, numClasses } = req.body;
  const newTeacher = await Teacher.create({
    fullName,
    age,
    dateOfBirth,
    numClasses
  });
  res.json(newTeacher);
});

// Endpoint to search for a teacher by name
app.get('/teachers/search', async (req, res) => {
    const { name } = req.query;
    const teachers = await Teacher.findAll({
        where: {
            fullName: {
                [Sequelize.Op.like]: `%${name}%`
            }
        }
    });
    if (teachers.length > 0) {
        return res.json(teachers);
    } else {
        return res.status(404).json({ error: 'Teacher not found' });
    }
});

// Endpoint to update a teacher's record
app.put('/teachers/:id', async (req, res) => {
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
});

// Endpoint to delete a teacher's record
app.delete('/teachers/:id', async (req, res) => {
  const { id } = req.params;
  const teacher = await Teacher.findByPk(id);
  if (teacher) {
    await teacher.destroy();
    res.json({ message: 'Teacher deleted successfully' });
  } else {
    res.status(404).json({ error: 'Teacher not found' });
  }
});

// Endpoint to filter teachers by age
app.get('/teachers/filter/age', async (req, res) => {
  const { minAge, maxAge } = req.query;
  const teachers = await Teacher.findAll({
    where: {
      age: {
        [Sequelize.Op.gte]: minAge || 0,
        [Sequelize.Op.lte]: maxAge || 100
      }
    }
  });
  res.json(teachers);
});

// Endpoint to filter teachers by number of classes
app.get('/teachers/filter/classes', async (req, res) => {
  const { minClasses, maxClasses } = req.query;
  const teachers = await Teacher.findAll({
    where: {
      numClasses: {
        [Sequelize.Op.gte]: minClasses || 0,
        [Sequelize.Op.lte]: maxClasses || 100
      }
    }
  });
  res.json(teachers);
});

// Endpoint to calculate average number of classes
app.get('/teachers/average-classes', async (req, res) => {
  const result = await Teacher.findAll({
    attributes: [[sequelize.fn('avg', sequelize.col('numClasses')), 'avgClasses']]
  });
  res.json(result[0]);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
