import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protectUser = async (req, res, next) => {
    const token = req.headers.token

    if(!token){
        return res.status(401).json({success: false, message: "Not authorized, Login to continue!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id)
        .select('-password')
        .populate({
            path: 'savedPalettes',
            select: 'colors', // or 'colors name' if you have palette name too
        });
        next();
    } catch (error) {
        return res.status(401).json({success: false, message: error.message });
    }
}