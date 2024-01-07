"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUserValidator = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
var newUserValidator = exports.newUserValidator = function newUserValidator(req, res, next) {
  var schema = _joi["default"].object({
    name: _joi["default"].string().min(4).required(),
    dob: _joi["default"].string().min(4).required(),
    address: _joi["default"].string().min(4).required(),
    phone: _joi["default"].number().min(10).required(),
    image: _joi["default"].string(),
    mail: _joi["default"].string().pattern(new RegExp('^[a-zA-z]{2}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$')).required(),
    password: _joi["default"].string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')).required(),
    role: _joi["default"].string()
  });
  var _schema$validate = schema.validate(req.body),
    error = _schema$validate.error,
    value = _schema$validate.value;
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};