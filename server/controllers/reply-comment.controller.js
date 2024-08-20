
const { where } = require('sequelize');
const db = require('../models');


class ReplyCommentController {

    async getReplyCommentsByCommentId(req, res) {
        try {
            const { comment_id } = req.params;
            const replyComments = await db.ReplyComment.findAll({
                where: {
                    comment_id
                },
                include: [
                    {
                        model: db.Account,
                        as: 'accounts',
                        attributes: ['id', 'nickname', 'avatar', 'tick']
                    }
                ]
            });

            if (replyComments) {
                return res.status(200).json(replyComments);
            }
        } catch (error) {
            return res.status(500).json(error.message);

        }
    }

    async createReplyComment(req, res) {
        try {
            if (req.body) {
                const replyComment = await db.ReplyComment.create(req.body);
                if (replyComment) {

                    const resReplyComment = await db.ReplyComment.findOne({
                        where: {
                            id: replyComment.id
                        },
                        include: [
                            {
                                model: db.Account,
                                as: 'accounts',
                                attributes: ['id', 'nickname', 'avatar', 'tick']
                            }
                        ]
                    })


                    return res.status(201).json(resReplyComment);
                }
            }
        } catch (error) {
            return res.status(500).json({ ...error.message });
        }
    }

    async deleteReplyComment(req, res) {

        const { acc_id, id } = req.query;
    

        try {
            const findComment = await db.ReplyComment.findOne({
                where: {
                    acc_id,
                    id
                }
            });

            if (findComment) {
                const response = await findComment.destroy();
                return res.status(200).json({ ...response.toJSON() });
            }
        } catch (error) {
            return res.status(500).json({ ...error.message });
        }
    }
}

module.exports = new ReplyCommentController();