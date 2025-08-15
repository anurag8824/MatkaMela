import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String,  },
  phone: { type: String,  },
  email: { type: String,},
  address: { type: String, },
  image: { type: String },
  password: { type: String,},
}, { timestamps: true });

const Users = mongoose.model('UsersEcom', userSchema);

export default Users;
