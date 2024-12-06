const { Sequelize, Op } = require("sequelize");
const db = require("../models");
const moment = require("moment");
const generateDateRange = require("../utils/generateDateRange");

class StatisticalController {
  async getAccountByTime(req, res, next) {
    try {
      const { start_day, end_day } = req.query;
      const startDate = new Date(start_day + "T00:00:00.000Z");
      const endDate = new Date(end_day + "T23:59:59.999Z");

      const allDates = generateDateRange(startDate, endDate);

      const result = await Promise.all(
        allDates.map(async (date) => {
          const accountsByDate = await db.Account.findAll({
            attributes: [
              [Sequelize.fn("DATE", Sequelize.col("createdAt")), "day"],
              [Sequelize.fn("COUNT", Sequelize.col("acc_id")), "num"],
            ],
            where: {
              createdAt: {
                [Op.gte]: new Date(date + "T00:00:00.000Z"),
                [Op.lte]: new Date(date + "T23:59:59.999Z"),
              },
              acc_id: { [Op.not]: "system" },
            },
            group: [Sequelize.fn("DATE", Sequelize.col("createdAt"))],
            order: [[Sequelize.fn("DATE", Sequelize.col("createdAt")), "ASC"]],
          });

          return {
            day: date,
            num: accountsByDate.length > 0 ? accountsByDate[0].dataValues.num : 0,
          };
        }),
      );

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getPostByTime(req, res, next) {
    try {
      const { start_day, end_day } = req.query;
      const startDate = new Date(start_day + "T00:00:00.000Z");
      const endDate = new Date(end_day + "T23:59:59.999Z");
      const allDates = generateDateRange(startDate, endDate);
      const result = await Promise.all(
        allDates.map(async (date) => {
          const postsByDate = await db.Post.findAll({
            attributes: [
              [Sequelize.fn("DATE", Sequelize.col("createdAt")), "day"],
              [Sequelize.fn("COUNT", Sequelize.col("post_id")), "num"],
            ],
            where: {
              createdAt: {
                [Op.gte]: new Date(date + "T00:00:00.000Z"),
                [Op.lte]: new Date(date + "T23:59:59.999Z"),
              },
            },
            group: [Sequelize.fn("DATE", Sequelize.col("createdAt"))],
            order: [[Sequelize.fn("DATE", Sequelize.col("createdAt")), "ASC"]],
          });

          return {
            day: date,
            num: postsByDate.length > 0 ? postsByDate[0].dataValues.num : 0,
          };
        }),
      );

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getVideoByTime(req, res, next) {
    try {
      const { start_day, end_day } = req.query;
      const startDate = new Date(start_day + "T00:00:00.000Z");
      const endDate = new Date(end_day + "T23:59:59.999Z");
      const allDates = generateDateRange(startDate, endDate);
      const result = await Promise.all(
        allDates.map(async (date) => {
          const videosByDate = await db.Video.findAll({
            attributes: [
              [Sequelize.fn("DATE", Sequelize.col("createdAt")), "day"],
              [Sequelize.fn("COUNT", Sequelize.col("video_id")), "num"],
            ],
            where: {
              createdAt: {
                [Op.gte]: new Date(date + "T00:00:00.000Z"),
                [Op.lte]: new Date(date + "T23:59:59.999Z"),
              },
            },
            group: [Sequelize.fn("DATE", Sequelize.col("createdAt"))],
            order: [[Sequelize.fn("DATE", Sequelize.col("createdAt")), "ASC"]],
          });


          return {
            day: date,
            num: videosByDate.length > 0 ? videosByDate[0].dataValues.num : 0,
          };
        }),
      );

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new StatisticalController();
