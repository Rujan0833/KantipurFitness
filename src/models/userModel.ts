import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
});

// Encrypt password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to check if entered password matches
userSchema.methods.matchPassword = async function(enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);

export default User; 