import mongoose from 'mongoose';

const UserBuySchema = new mongoose.Schema({
  name: String,
  phone: String,
  address1: String,
  address2: String,
  address3: String,
  address4: String,
  city: String,
  pincode: String,
  aadharCardPath: String,
  passportPhotoPath: String,
  productId: String,
}, { timestamps: true });

const UserBuy =  mongoose.model('UserBuy', UserBuySchema);
export default UserBuy;
