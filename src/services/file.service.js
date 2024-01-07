import fileUploadData from "../models/file.model";

export const fileUpload = async (file) => {

    const data = await fileUploadData.create(file);
    return data;
};

export const getFiles = async (id) => {
    const data = await fileUploadData.find({userId: id});
    return data;
};


export const deleteFile = async (id) => {
    await fileUploadData.findByIdAndDelete(id);
    
    return true;
};