
const db = require('../models/');
const uuid = require('uuid');

class commentController {

    async getAllComments(req, res, next) {
        try {
            const { post_id, video_id } = req.query;
            const whereCondition = {};

            if (post_id) {
                whereCondition.post_id = post_id;
            }
            if (video_id) {
                whereCondition.video_id = video_id;
            }

            const comments = await db.Comment.findAll({
                where: whereCondition,
                include: [
                    {
                        model: db.Account,
                        as: 'accounts',
                        attributes: ['acc_id', 'full_name', 'nickname', 'avatar', 'tick']
                    },
                    {
                        model: db.Post,
                        as: 'posts',
                        attributes: ['post_id', 'title', 'num_comments', 'num_likes']
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            });

            if (comments.length > 0) {
                return res.json(comments);
            }
            return res.status(404).json({ error: 'No comments found' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getCommentByPostIdAndCommentId(req, res, next) {

    }

    async createComment(req, res, next) {
        try {
            if (req.body) {
                const comment = await db.Comment.create({
                    ...req.body,
                    comment_id: uuid.v4()
                });
                if (comment) {
                    const resComment = await db.Comment.findAll({
                        include: [
                            {
                                model: db.Account,
                                as: 'accounts',
                                attributes: ['acc_id', 'full_name', 'nickname', 'avatar', 'tick']
                            },
                            {
                                model: db.Post,
                                as: 'posts',
                                attributes: ['post_id', 'title', 'num_comments', 'num_likes']
                            }
                        ],
                        where: {
                            comment_id: comment.dataValues.comment_id
                        }
                    });

                    const plainResComment = resComment.map(comment => comment.get({ plain: true }));

                    return res.status(201).json({ ...plainResComment[0] });
                }
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }


    async deleteComment(req, res, next) {
        try {
            const { comment_id } = req.params;
            const findComment = await db.Comment.findOne({
                where: {
                    comment_id
                },
                include: [
                    {
                        model: db.Account,
                        as: 'accounts',
                        attributes: ['acc_id', 'full_name', 'nickname', 'avatar', 'tick']
                    }
                ]
            });

            if (findComment) {
                await findComment.destroy();
                return res.status(201).json({
                    success: true,
                    comment_id
                });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }


    async updateComment(req, res, next) {
        const { comment_id } = req.params;

        try {
            const findComment = await db.Comment.findOne({
                where: { comment_id },
                include: [
                    {
                        model: db.Account,
                        as: 'accounts',
                        attributes: ['acc_id', 'full_name', 'nickname', 'avatar', 'tick']
                    }
                ]
            });

            if (findComment) {
                const updatedComment = await findComment.update(req.body);
                return res.status(200).json(updatedComment);
            } else {
                return res.status(404).json({ error: "Comment not found" });
            }

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

}


module.exports = new commentController();