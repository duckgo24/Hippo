const express = require('express');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

module.exports = function cloudinarService(type) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

   let typeVideo = {
        folder: 'videos',
        resource_type: 'video',
        format: async (req, file) => 'mp4',
    }

    let typeImage = {
        folder: 'images',
        resource_type: 'image',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    }
    

    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: type === 'video' ? typeVideo : typeImage,
    });


    const upload = multer({ storage: storage });

    return upload;

}