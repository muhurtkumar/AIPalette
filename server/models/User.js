import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  savedPalettes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Palette'
    }
  ],
  savedColors: [
    {
      type: String
    }
  ],
  likedPalettes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Palette'
    }
  ],
},
{
  timestamps: true
});

const User = mongoose.model('User', userSchema); 

export default User;
