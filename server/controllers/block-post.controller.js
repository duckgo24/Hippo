
const { Op } = require('sequelize');
const db = require('../models/index');
const uuid = require('uuid');

class blockPostController {
    async block(req, res, next) {

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

            const checkExitBlockPost = await db.BlockPost.findOne({
                where: whereCondition
            });

            if (!checkExitBlockPost) {
                const data = await db.BlockPost.create({
                    ...req.body,
                    id: uuid.v4()
                });
                if (data) {
                    return res.status(201).json(data);
                }
            }
        } catch (error) {
            return res.status(501).json({ error: error.message });
        }
    }

}

module.exports = new blockPostController();