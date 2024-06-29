const express = require("express");
const { Op } = require("sequelize");
const { Teacher } = require("../models");
const { Sequelize } = require("sequelize");

const router = express.Router();

router.get("/dashboard", async (req, res) => {
  try {
    const totalTeachers = await Teacher.count();

    const oneHourAgo = new Date(new Date() - 60 * 60 * 1000);
    const teachersLastHour = await Teacher.count({
      where: {
        createdAt: {
          [Op.gte]: oneHourAgo,
        },
      },
    });

    const averageClassesPerTeacher = await Teacher.findOne({
      attributes: [
        [Sequelize.fn("AVG", Sequelize.col("numClasses")), "avgClasses"],
      ],
    });

    const youngestTeacher = await Teacher.findOne({
      order: [["age", "ASC"]],
      attributes: ["fullName", "age"],
    });

    const oldestTeacher = await Teacher.findOne({
      order: [["age", "DESC"]],
      attributes: ["fullName", "age"],
    });

    res.json({
      totalTeachers,
      teachersLastHour,
      averageClassesPerTeacher: parseFloat(
        averageClassesPerTeacher.getDataValue("avgClasses")
      ).toFixed(2),
      youngestTeacher,
      oldestTeacher,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching dashboard data" });
  }
});


module.exports = router;
