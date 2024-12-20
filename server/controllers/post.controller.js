const { Op } = require('sequelize');
const db = require('../models/index');
const uuid = require('uuid');

class PostController {
    async getPostWithPagination(req, res, next) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const offset = (parsedPage - 1) * parsedLimit;

            const { count: total_record, rows: data } = await db.Post.findAndCountAll({
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

    async getAllPosts(req, res, next) {
        try {
            const posts = await db.Post.findAll({
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

            if (!posts || posts.length === 0) {
                return res.status(404).json({ message: 'No posts found' });
            }

            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getPostWithPagination2(req, res, next) {
        try {
            const { page = 1, limit = 3 } = req.query;

            const offset = (parseInt(page) - 1) * parseInt(limit);
            const limitParsed = parseInt(limit);

            const posts = await db.Post.findAndCountAll({
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

            if (!posts.rows || posts.rows.length === 0) {
                return res.status(404).json({ message: 'No posts found' });
            }

            return res.status(200).json({
                totalPosts: posts.count,
                totalPages: Math.ceil(posts.count / limitParsed),
                currentPage: parseInt(page),
                posts: posts.rows,
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getMyPosts(req, res, next) {
        try {
            const { acc_id } = req.params;
            if (!acc_id) {
                return res.status(400).json({ message: 'Missing account_id parameter' });
            }

            const posts = await db.Post.findAll({
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

            if (posts) {
                return res.status(200).json(posts);
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async createPost(req, res, next) {
        try {
            const post = await db.Post.create({
                ...req.body,
                post_id: uuid.v4(),
            });
            if (post) {
                const res_post = await db.Post.findOne({
                    where: {
                        post_id: post.post_id,
                    },
                    include: [
                        {
                            model: db.Account,
                            as: 'accounts',
                            attributes: ['acc_id', 'full_name', 'nickname', 'avatar', 'tick'],
                        },
                    ],
                });
                return res.status(201).json(res_post);
            }
        } catch (error) {
            res.status(501).json({ error });
        }
    }

    async deletePost(req, res, next) {
        const { post_id } = req.params;
        try {
            const post = await db.Post.findByPk(post_id);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            await post.destroy();

            return res.status(200).json({
                success: true,
                post_id,
            });
        } catch (error) {
            res.status(501).json({ error });
        }
    }

    async updatePost(req, res, next) {
        try {
            const checkExitPost = await db.Post.findByPk(req.params.post_id);
            if (!checkExitPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            const { acc_id, ...data } = req.body;
            const post = await checkExitPost.update({
                ...data,
            });

            if (post) {
                return res.status(200).json(post);
            }
        } catch (error) {
            return res.status(501).json({ error });
        }
    }
    async searchPost(req, res, next) {
        try {
            const { q } = req.params;

            const resultPosts = await db.Post.findAll({
                where: {
                    title: {
                        [Op.substring]: q,
                    },
                },
            });

            if (resultPosts.count === 0) {
                return res.status(404).json({ error: 'Post not found' });
            }
            return res.status(200).json(resultPosts);
        } catch (error) {
            return res.status(501).json({ error });
        }
    }

    async getPostById(req, res, next) {
        const { post_id } = req.params;
        try {
            const post = await db.Post.findByPk(post_id, {
                include: [
                    {
                        model: db.Account,
                        as: 'accounts',
                        attributes: ['acc_id', 'full_name', 'nickname', 'full_name', 'avatar', 'tick'],
                    },
                ],
            });
            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: 'Post not found',
                });
            }

            return res.status(200).json(post);
        } catch (error) {
            res.status(501).json({ error });
        }
    }

    async blockPost(req, res, next) {}

    async getStatisticalPost(req, res, next) {
        try {
            const { start_day, end_day } = req.query;

            const startDate = new Date(start_day + 'T00:00:00.000Z');
            const endDate = new Date(end_day + 'T23:59:59.999Z');
            const numDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

            const previousStartDate = new Date(startDate);
            previousStartDate.setDate(previousStartDate.getDate() - numDays);

            const previousEndDate = new Date(startDate);
            previousEndDate.setDate(previousEndDate.getDate() - 1);

            const currentCount = await db.Post.count({
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate],
                    },
                },
            });

            const previousCount = await db.Post.count({
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

module.exports = new PostController();
