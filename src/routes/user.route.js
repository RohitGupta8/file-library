import express from 'express';
import * as userController from '../controllers/user.controller';
import {newUserValidator} from '../validators/user.validator';
import {userAuth, setRole, isAdmin} from '../middlewares/auth.middleware';
import * as fileController from '../controllers/file.controller'
import {upload} from '../middlewares/upload';
const router = express.Router();


router.get('/file', userAuth, fileController.getFiles);

//route to create a new user or admin
router.post('/user', upload.single('image'), newUserValidator, setRole('user'), userController.newUser);
router.post('/admin', upload.single('image'), newUserValidator, setRole('admin'), userController.newUser);

//login
router.post('/login', userController.loginUser);

//route to get all users
router.get('/getAllUsers', userAuth, isAdmin, userController.getAllUsers);

//route to get a single user by their user id
router.get('/:_id', userAuth, isAdmin, userController.getUser);

// Verify User
router.get("/verify/:token", userController.verifyUser);

//route to update a single user by their user id
router.put('/:_id',userAuth, userController.updateUser);

//route to delete a single user by their user id
router.delete('/:_id',userAuth, isAdmin, userController.deleteUser);

// File upload route
router.post('/file/upload', userAuth, upload.single('file'), fileController.fileUpload);

router.delete('/file/:_id', fileController.deleteFile);
export default router;
