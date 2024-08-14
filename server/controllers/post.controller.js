const { Op } = require('sequelize');
const db = require('../models/index');

class PostController {
    async getAllPosts(req, res, next) {
        try {
            const posts = await db.Post.findAll({
                include: [
                    {
                        model: db.Account,
                        as: 'accounts',
                        attributes: ['id', 'nickname', 'avatar', 'tick']
                    },
                    {
                        model: db.Like,
                        as: 'likes',
                        attributes: ['acc_id']
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            });


            if (!posts || posts.length === 0) {
                return res.status(404).json({ message: "No posts found" });
            }

            return res.status(200).json([...posts]);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }



    async createPost(req, res, next) {
        try {
            const post = await db.Post.create(req.body);

            if (post) {
                return res.status(201).json(post);
            }
        } catch (error) {
            res.status(501).json({ error });
        }
    }
    async deletePost(req, res, next) {
        try {
            const post = await db.Post.findByPk(req.params.id);

            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            await post.destroy();

            return res.status(200).json({ message: 'Post deleted successfully' });

        } catch (error) {
            res.status(501).json({ error });

        }
    }

    async updatePost(req, res, next) {
        try {
            const checkExitPost = await db.Post.findByPk(req.params.id);
            if (!checkExitPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            const post = await checkExitPost.update(req.body);

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

    async findPost(req, res, next) {
        try {
            const post = await db.Post.findByPk(req.params.id);

            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            return res.status(200).json(post);
        } catch (error) {
            res.status(501).json({ error });
        }
    }

}

module.exports = new PostController();