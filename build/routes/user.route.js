"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var userController = _interopRequireWildcard(require("../controllers/user.controller"));
var _user2 = require("../validators/user.validator");
var _auth = require("../middlewares/auth.middleware");
var fileController = _interopRequireWildcard(require("../controllers/file.controller"));
var _upload = require("../middlewares/upload");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var router = _express["default"].Router();

//route to create a new user or admin
router.post('/user', (0, _auth.setRole)('user'), _upload.upload.single('image'), _user2.newUserValidator, userController.newUser);
router.post('/admin', (0, _auth.setRole)('admin'), _upload.upload.single('image'), _user2.newUserValidator, userController.newUser);

//login
router.post('/login', userController.loginUser);

//route to get all users
router.get('', userController.getAllUsers);

//route to get a single user by their user id
router.get('/:_id', _auth.userAuth, userController.getUser);

//route to update a single user by their user id
router.put('/:_id', userController.updateUser);

//route to delete a single user by their user id
router["delete"]('/:_id', userController.deleteUser);

// File upload route
router.post('/file/upload', _auth.userAuth, _upload.upload.single('file'), fileController.fileUpload);
router.get('/file', _auth.userAuth, fileController.getFiles);
var _default = exports["default"] = router;