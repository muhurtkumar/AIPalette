import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });

    console.log('Cloudinary connected successfully');
};

// Multer storage config
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'aipalette-profile-photos',
        allowed_formats: ['jpeg', 'png', 'jpg'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
    },
});

export default connectCloudinary;
export { cloudinary, storage };
