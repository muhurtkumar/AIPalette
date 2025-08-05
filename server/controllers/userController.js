import User from "../models/User.js";
import bcrypt from 'bcrypt';
import generateToken from "../utils/generateToken.js";

// Register a new user
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ success: false, message: "User already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            image: imageFile.path
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                image: newUser.image
            },
            token: generateToken(newUser._id)
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
