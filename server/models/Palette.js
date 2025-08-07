import mongoose from "mongoose";

const PaletteSchema = new mongoose.Schema(
    {
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },
        colors: [String],
        likes: {
        type: Number,
        default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Palette = mongoose.model('Palette', PaletteSchema);

export default Palette;