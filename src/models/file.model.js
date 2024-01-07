import {Schema, model} from 'mongoose';
import mongoose from 'mongoose'
const fileInformationSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'FileLibraryUser'},
        file: {type: String},
        fileName: {type: String},
        fileSize: {type: Number},
        fileType: {type: String}
    },
    {
        timestamps: true
    }
);

export default model('FileInformation', fileInformationSchema);
