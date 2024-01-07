import {Schema, model} from 'mongoose';

const userSchema = new Schema(
  {
    name: {type: String, required: true, },
    dob: {type: String, required: true, },
    address: {type: String, required: true, },
    phone: {type: Number, unique: true, required: true, },
    mail: {type: String, unique: true, required: true, },
    image: {type: String},
    password: {type: String, required: true},
    role: { type: String, required: true },
    verified: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

export default model('FileLibraryUser', userSchema);
