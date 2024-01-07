import HttpStatus from 'http-status-codes';
import * as FileService from '../services/file.service';

function getExtensionFromFileName(fileName) {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) {
        return ""; // No extension found
    }

    return fileName.slice(lastDotIndex + 1).toLowerCase();
}

export const fileUpload = async (req, res, next) => {
    try {
        const file = {
            userId: req.user.id,
            file: req.file.path,
            fileName: req.file.originalname,
            fileSize: req.file.size,
            fileType: getExtensionFromFileName(req.file.originalname)
        }
        
        const data = await FileService.fileUpload(file);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'File uploaded successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const getFiles = async (req, res, next) => {
    try {        
        const data = await FileService.getFiles(req.user.id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: data.length === 0 ? ' There is no files for this user' : 'All Files fetched successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const deleteFile = async (req, res, next) => {
    try {
      await FileService.deleteFile(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: [],
        message: 'File deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };

