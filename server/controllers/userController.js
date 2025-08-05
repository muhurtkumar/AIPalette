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

// User Login
export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        if(!email || !password) {
            return res.json({success:false, message: "All fields are required" });
        }

        const user = await User.findOne({email})
        if(!user) {
            return res.json({success:false, message: "User not registered" });
        }

        if(await bcrypt.compare(password, user.password)){
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image
                },
                token: generateToken(user._id)
            });
        }
        else{
            return res.json({success:false, message: "Invalid email or password" });
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}
