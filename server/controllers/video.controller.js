const { Op } = require('sequelize');
const db = require('../models/index');
const uuid = require('uuid');

class VideoController {
    async getVideoWithPagination(req, res, next) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const offset = (parsedPage - 1) * parsedLimit;

            const { count: total_record, rows: data } = await db.Video.findAndCountAll({
                offset,
                limit: parsedLimit,
                order: [['createdAt', 'DESC']],
            });

            return res.json({
                data,
                total_record,
                page: parsedPage,
                limit: parsedLimit,
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getAllVideos(req, res, next) {
        try {
            const videos = await db.Video.findAll({
                include: [
                    {
                        model: db.Account,
                        as: 'accounts',
                        attributes: ['acc_id', 'full_name', 'nickname', 'avatar', 'tick'],
                    },
                    {
                        model: db.Like,
                        as: 'likes',
                        attributes: ['acc_id'],
                    },
                ],
                order: [['createdAt', 'DESC']],
            });

            if (!videos || videos.length === 0) {
                return res.status(404).json([]);
            }

            return res.status(200).json(videos);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getVideoWithPagination2(req, res, next) {
        try {
            const { page = 1, limit = 3 } = req.query;

            const offset = (parseInt(page) - 1) * parseInt(limit);
            const limitParsed = parseInt(limit);

            const videos = await db.Video.findAndCountAll({
                include: [
                    {
                        model: db.Account,
                        as: 'accounts',
                        attributes: ['acc_id', 'full_name', 'nickname', 'avatar', 'tick'],
                    },
                    {
                        model: db.Like,
                        as: 'likes',
                        attributes: ['acc_id'],
                    },
                ],
                order: [['createdAt', 'DESC']],
                limit: limitParsed,
                offset: offset,
            });

            if (!videos.rows || videos.rows.length === 0) {
                return res.status(404).json({ message: 'No Videos found' });
            }

            return res.status(200).json({
                totalVideos: videos.count,
                totalPages: Math.ceil(videos.count / limitParsed),
                currentPage: parseInt(page),
                videos: videos.rows,
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getMyVideos(req, res, next) {
        try {
            const { acc_id } = req.params;
            if (!acc_id) {
                return res.status(400).json({ message: 'Missing account_id parameter' });
            }

            const videos = await db.Video.findAll({
                where: {
                    acc_id,
                },
                include: [
                    {
                        model: db.Account,
                        as: 'accounts',
                        attributes: ['acc_id', 'full_name', 'nickname', 'avatar', 'tick'],
                    },
                    {
                        model: db.Like,
                        as: 'likes',
                        attributes: ['acc_id'],
                    },
                ],
                order: [['createdAt', 'DESC']],
            });

            if (videos) {
                return res.status(200).json(videos);
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async getVideoById(req, res, next) {
        const { video_id } = req.params;
        try {
            const video = await db.Video.findByPk(video_id, {
                include: [
                    {
                        model: db.Account,
                        as: 'accounts',
                        attributes: ['acc_id', 'full_name', 'nickname', 'avatar', 'tick'],
                    },
                ],
            });
            if (!video) {
                return res.status(404).json({
                    success: false,
                    message: 'Video not found',
                });
            }

            return res.status(200).json(video);
        } catch (error) {
            res.status(501).json({ error });
        }
    }

    async createVideo(req, res, next) {
        try {
            const video = await db.Video.create({
                ...req.body,
                video_id: uuid.v4(),
            });

            if (video) {
                const res_video = await db.Video.findOne({
                    where: {
                        video_id: video.video_id,
                    },
                    include: [
                        {
                            model: db.Account,
                            as: 'accounts',
                            attributes: ['acc_id', 'full_name', 'nickname', 'avatar', 'tick'],
                        },
                    ],
                });
                return res.status(201).json(res_video);
            }
        } catch (error) {
            res.status(501).json({ error });
        }
    }

    async deleteVideo(req, res, next) {
        try {
            const video = await db.Video.findByPk(req.params.id);

            if (!video) {
                return res.status(404).json({ message: 'Video not found' });
            }

            await video.destroy();

            return res.status(200).json({ message: 'Video deleted successfully' });
        } catch (error) {
            res.status(501).json({ error });
        }
    }

    async updateVideo(req, res, next) {
        try {
            const checkExitVideo = await db.Video.findByPk(req.params.id);
            if (!checkExitVideo) {
                return res.status(404).json({ message: 'Video not found' });
            }
            const video = await checkExitVideo.update(req.body);

            if (video) {
                return res.status(200).json(video);
            }
        } catch (error) {
            return res.status(501).json({ error });
        }
    }

    async getStatisticalVideo(req, res, next) {
        try {
            const { start_day, end_day } = req.query;

            const startDate = new Date(start_day + 'T00:00:00.000Z');
            const endDate = new Date(end_day + 'T23:59:59.999Z');
            const numDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

            const previousStartDate = new Date(startDate);
            previousStartDate.setDate(previousStartDate.getDate() - numDays);

            const previousEndDate = new Date(startDate);
            previousEndDate.setDate(previousEndDate.getDate() - 1);

            const currentCount = await db.Video.count({
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate],
                    },
                },
            });

            const previousCount = await db.Video.count({
                where: {
                    createdAt: {
                        [Op.between]: [previousStartDate, previousEndDate],
                    },
                },
            });

            const rate =
                previousCount > 0 ? ((currentCount - previousCount) / previousCount) * 100 : currentCount * 100;

            return res.json({
                total: currentCount,
                rate: Math.round(rate * 100) / 100,
            });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = new VideoController();
