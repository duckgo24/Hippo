

const express = require('express');
const route = express.Router();

const cloudinarService = require('../services/cloudinary.service');

route.post('/video', cloudinarService('video').single('video'), (req, res) => {
    try {
        return res.json({
            message: 'Upload thành công!',
            url: req.file.path,
        });
    } catch (error) {
        return res.status(500).json({ error: 'Có lỗi khi upload video!' });
    }
});

route.post('/image', cloudinarService('image').single('image'), (req, res) => {
    try {
        return res.json({
            message: 'Upload thành công!',
            url: req.file.path,
        });
    } catch (error) {
        return res.status(500).json({ error: 'Có lỗi khi upload ảnh!' });
    }
});

module.exports = route;