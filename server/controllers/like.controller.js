
const { Op } = require('sequelize');
const db = require('../models/index');

class LikeController {
    async getAllLikesPost(req, res, next) {
        try {
            const { acc_id } = req.query;

            const posts = await db.Post.findAll({
                include: [
                    {
                        model: db.Like,
                        as: 'likes',
                        where: { acc_id },
                        attributes: ['acc_id'],
                        order: [
                            ['id', 'ASC'],
                        ],
                    },
                    {
                        model: db.Account,
                        as: 'accounts',
                        attributes: ['id', 'nickname', 'avatar', 'tick']
                    }
                ]
            });
            

            return res.status(200).json([...posts]);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getAllLikesVideo(req, res, next) {
        try {
            const likes = await db.Like.findAll({
                include: {
                    model: db.Account,
                    as: 'accounts',
                    attributes: ['id']
                },
                include: {
                    model: db.Video,
                    as: 'videos',
                    attributes: ['id'],
                }
            })
            return res.status(200).json({
                likes
            });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    }
    async like(req, res, next) {

        const { post_id, video_id, acc_id } = req.body;
        try {
            const whereCondition = {
                [Op.or]: [],
                acc_id
            };

            if (post_id) {
                whereCondition[Op.or].push({ post_id });
            }

            if (video_id) {
                whereCondition[Op.or].push({ video_id });
            }

            const checkExitLike = await db.Like.findOne({
                where: whereCondition
            });

            if (!checkExitLike) {
                const like = await db.Like.create(req.body);
                if (like) {
                    return res.status(201).json({
                        like
                    });
                }
            }
        } catch (error) {
            return res.status(501).json({ error: error.message });
        }
    }
    async dislike(req, res, next) {
        console.log(req.query);

        try {
            const { post_id, video_id, acc_id } = req.query;

            const whereCondition = {
                [Op.or]: [],
                acc_id
            };

            if (post_id) {
                whereCondition[Op.or].push({ post_id });
            }

            if (video_id) {
                whereCondition[Op.or].push({ video_id });
            }

            const checkExitLike = await db.Like.findOne({
                where: whereCondition
            });

            if (checkExitLike) {
                await checkExitLike.destroy({
                    whereCondition: whereCondition
                });
                return res.status(200).json({
                    message: 'Dislike successful'
                });
            } else {
                return res.status(404).json({ message: 'Like not found' });
            }

        } catch (error) {
            return res.status(501).json({ error: error.message });
        }
    }

}

module.exports = new LikeController();