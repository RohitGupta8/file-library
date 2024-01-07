"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = _interopRequireDefault(require("./user.route"));
var router = _express["default"].Router();
/**
 * Function contains Application routes
 *
 * @returns router
 */
var routes = function routes() {
  router.get('/', function (req, res) {
    // Get the name from the request or use a default name
    var name = req.query.name || 'Rohit';

    // Instead of sending JSON, send an HTML page
    res.send("\n      <!DOCTYPE html>\n      <html lang=\"en\">\n      <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <title>Welcome</title>\n      </head>\n      <body>\n        <h1>Welcome Mr. ".concat(name, "</h1>\n        <p>Your project is working fine.</p>\n      </body>\n      </html>\n    "));
  });
  router.use('/users', _user["default"]);
  return router;
};
var _default = exports["default"] = routes;