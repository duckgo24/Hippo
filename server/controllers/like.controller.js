
const { Op } = require('sequelize');
const db = require('../models/index');
const uuid = require('uuid');

class LikeController {
    async getAllLikesByPostId(req, res, next) {
        try {
            const { post_id } = req.params;

            const likes = await db.Like.findAll({
                where: {
                    post_id
                },
                include: {
                    model: db.Account,
                    as: 'accounts',
                    attributes: ['acc_id', 'full_name', 'nickname', 'avatar', 'tick']
                },
                include: {
                    model: db.Post,
                    as: 'posts',
                    attributes: ['post_id', 'created_at', 'updated_at'],
                }
            });

            if (!likes) {
                return res.status(404).json({
                    success: false,
                    message: 'Likes not found'
                });
            }


            return res.status(200).json(likes);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getAllLikesByVideoId(req, res, next) {
        try {
            const { video_id } = req.params;

            const likes = await db.Like.findAll({
                where: {
                    video_id
                },
                include: {
                    model: db.Account,
                    as: 'accounts',
                    attributes: ['acc_id', 'full_name', 'nickname', 'avatar', 'tick']
                },
                include: {
                    model: db.Video,
                    as: 'videos',
                    attributes: ['video_id', 'created_at', 'updated_at'],
                }
            });

            if (!likes) {
                return res.status(404).json({
                    success: false,
                    message: 'Likes not found'
                });
            }


            return res.status(200).json(likes);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async like(req, res, next) {
        const { post_id, video_id, acc_id } = req.body;
        try {
            if (!acc_id) {
                return res.status(400).json({ error: "Account ID is required." });
            }

            const whereCondition = {
                acc_id,
                [Op.or]: []
            };

            if (post_id) {
                whereCondition[Op.or].push({ post_id });
            }

            if (video_id) {
                whereCondition[Op.or].push({ video_id });
            }

            if (!whereCondition[Op.or].length) {
                return res.status(400).json({ error: "Either post_id or video_id is required." });
            }

            const checkExitLike = await db.Like.findOne({
                where: whereCondition
            });

            if (checkExitLike) {
                return res.status(200).json({ message: "Like already exists.", like: checkExitLike });
            }

            const like = await db.Like.create({
                ...req.body,
                id: uuid.v4()
            });

            const res_like = await db.Like.findOne({
                where: { id: like.id },
                include: [
                    {
                        model: db.Account,
                        as: 'accounts',
                        attributes: ['acc_id', 'full_name', 'nickname', 'avatar', 'tick']
                    },
                    {
                        model: db.Post,
                        as: 'posts',
                        attributes: ['post_id', 'createdAt', 'updatedAt'],
                    }
                ]
            });

            return res.status(200).json(res_like);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async dislike(req, res, next) {
        const { post_id, video_id, acc_id } = req.body;
        try {

            if (post_id) {
                const checkExitLike_1 = await db.Like.findOne({
                    where: {
                        post_id,
                        acc_id
                    }
                });

                if (checkExitLike_1) {
                    await db.Like.destroy({
                        where: {
                            post_id,
                            acc_id
                        }
                    });
                    return res.status(200).json({
                        post_id,
                        acc_id,
                    });
                }
            }

            if (video_id) {
                const checkExitLike_2 = await db.Like.findOne({
                    where: {
                        video_id,
                        acc_id
                    }
                });
                if (checkExitLike_2) {
                    await db.Like.destroy({
                        where: {
                            video_id,
                            acc_id
                        }
                    });
                    return res.status(200).json({
                        video_id,
                        acc_id,
                    });
                }
            }

        } catch (error) {
            return res.status(501).json({ error: error.message });
        }
    }

}

module.exports = new LikeController();