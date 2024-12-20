const { Sequelize, Op } = require('sequelize');
const db = require('../models');
const generateDateRange = require('../utils/generateDateRange');

class StatisticalController {
    async getAccountByTime(req, res, next) {
        try {
            const { start_day, end_day, type } = req.query;

            const startDate = new Date(start_day + 'T00:00:00.000Z');
            const endDate = new Date(end_day + 'T23:59:59.999Z');

            if (type === 'year') {
                const endYear = endDate.getFullYear();
                let data = [];

                for (let month = 0; month < 12; month++) {
                    const startOfMonth = new Date(endYear, month, 1);
                    const endOfMonth = new Date(endYear, month + 1, 0, 23, 59, 59, 999);

                    const accountsByMonth = await db.Account.findAll({
                        attributes: [
                            [Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'month'],
                            [Sequelize.fn('COUNT', Sequelize.col('acc_id')), 'num'],
                        ],
                        where: {
                            createdAt: {
                                [Op.gte]: startOfMonth,
                                [Op.lte]: endOfMonth,
                            },
                            acc_id: { [Op.not]: 'system' },
                        },
                        group: [Sequelize.fn('MONTH', Sequelize.col('createdAt'))],
                        order: [[Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'ASC']],
                    });

                    data.push({
                        day: `Tháng ${month + 1}`,
                        num: accountsByMonth.length > 0 ? accountsByMonth[0].dataValues.num : 0,
                    });
                }

                return res.status(200).json(data);
            }

            const allDates = generateDateRange(startDate, endDate);

            const result = await Promise.all(
                allDates.map(async (date) => {
                    const accountsByDate = await db.Account.findAll({
                        attributes: [
                            [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'day'],
                            [Sequelize.fn('COUNT', Sequelize.col('acc_id')), 'num'],
                        ],
                        where: {
                            createdAt: {
                                [Op.gte]: new Date(date + 'T00:00:00.000Z'),
                                [Op.lte]: new Date(date + 'T23:59:59.999Z'),
                            },
                            acc_id: { [Op.not]: 'system' },
                        },
                        group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))],
                        order: [[Sequelize.fn('DATE', Sequelize.col('createdAt')), 'ASC']],
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
            const { start_day, end_day, type } = req.query;
            const startDate = new Date(`${start_day}T00:00:00.000Z`);
            const endDate = new Date(`${end_day}T23:59:59.999Z`);

            if (type === 'year') {
                const endYear = endDate.getFullYear();
                let data = [];

                for (let month = 0; month < 12; month++) {
                    const startOfMonth = new Date(endYear, month, 1);
                    const endOfMonth = new Date(endYear, month + 1, 0, 23, 59, 59, 999);


                    const postsByMonth = await db.Post.findAll({
                        attributes: [
                            [Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'month'],
                            [Sequelize.fn('COUNT', Sequelize.col('post_id')), 'num'],
                        ],
                        where: {
                            createdAt: {
                                [Op.gte]: startOfMonth,
                                [Op.lte]: endOfMonth,
                            },
                        },
                        group: [Sequelize.fn('MONTH', Sequelize.col('createdAt'))],
                    });

                    
                    const totalPosts = postsByMonth.reduce((acc, post) => acc + parseInt(post.dataValues.num, 10), 0);

                    data.push({
                        day: `Tháng ${month + 1}`,
                        num: totalPosts,
                    });
                }

                return res.status(200).json(data);
            }

          
            const allDates = generateDateRange(startDate, endDate);
            const result = await Promise.all(
                allDates.map(async (date) => {
                    const startOfDay = new Date(`${date}T00:00:00.000Z`);
                    const endOfDay = new Date(`${date}T23:59:59.999Z`);

                    const postsByDate = await db.Post.findAll({
                        attributes: [
                            [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'day'],
                            [Sequelize.fn('COUNT', Sequelize.col('post_id')), 'num'],
                        ],
                        where: {
                            createdAt: {
                                [Op.gte]: startOfDay,
                                [Op.lte]: endOfDay,
                            },
                        },
                        group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))],
                    });

                    const totalPosts = postsByDate.reduce((acc, post) => acc + parseInt(post.dataValues.num, 10), 0);

                    return {
                        day: date,
                        num: totalPosts,
                    };
                }),
            );

            return res.status(200).json(result);
        } catch (error) {
            console.error('Error in getPostByTime:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    async getVideoByTime(req, res, next) {
        try {
            const { start_day, end_day, type } = req.query;
            const startDate = new Date(`${start_day}T00:00:00.000Z`);
            const endDate = new Date(`${end_day}T23:59:59.999Z`);
            if (type === 'year') {
                const endYear = endDate.getFullYear();
                let data = [];

                for (let month = 0; month < 12; month++) {
                    const startOfMonth = new Date(endYear, month, 1);
                    const endOfMonth = new Date(endYear, month + 1, 0, 23, 59, 59, 999);

                    const videosByMonth = await db.Video.findAll({
                        attributes: [
                            [Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'month'],
                            [Sequelize.fn('COUNT', Sequelize.col('video_id')), 'num'],
                        ],
                        where: {
                            createdAt: {
                                [Op.gte]: startOfMonth,
                                [Op.lte]: endOfMonth,
                            },
                        },
                        group: [Sequelize.fn('MONTH', Sequelize.col('createdAt'))],
                    });

                  
                    const totalVideos = videosByMonth.reduce((acc, video) => acc + parseInt(video.dataValues.num, 10), 0);

                    data.push({
                        day: `Tháng ${month + 1}`,
                        num: totalVideos,
                    });
                }

                return res.status(200).json(data);
            }

            const allDates = generateDateRange(startDate, endDate);
            const result = await Promise.all(
                allDates.map(async (date) => {
                    const startOfDay = new Date(`${date}T00:00:00.000Z`);
                    const endOfDay = new Date(`${date}T23:59:59.999Z`);

                    const videosByDate = await db.Video.findAll({
                        attributes: [
                            [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'day'],
                            [Sequelize.fn('COUNT', Sequelize.col('video_id')), 'num'],
                        ],
                        where: {
                            createdAt: {
                                [Op.gte]: startOfDay,
                                [Op.lte]: endOfDay,
                            },
                        },
                        group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))],
                    });

                    const totalVideos = videosByDate.reduce((acc, video) => acc + parseInt(video.dataValues.num, 10), 0);

                    return {
                        day: date,
                        num: totalVideos,
                    };
                }),
            );

            return res.status(200).json(result);
        } catch (error) {
            console.error('Error in getVideoByTime:', error);
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new StatisticalController();
