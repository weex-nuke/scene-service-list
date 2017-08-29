'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (param, APIMAP) {
  if (_global2.default.env && _global2.default.env == 'local') {
    try {
      var url = APIMAP.local[param.name].value;
      return QN.fetch(url).then(function (response) {
        return response.json();
      }).catch(function (err) {});
    } catch (error) {
      throw new Error(error, 'local url is undefined in apimap.js');
    }
  } else {
    var st = new Date();
    try {
      var _url = APIMAP.product[param.name].value;
      param.data ? param.data.timestamp = Date.now() : null;
      var queryString = _qs2.default.stringify(param.data);
      param.url = _url + '?' + queryString;

      return fetch(param.url, param).then(function (response) {
        var ed = Date.now() - st;
        return response.json();
      }).catch(function (err) {
        var ed = Date.now() - st;
      });
    } catch (error) {
      throw new Error(error, 'product url is undefined in apimap.js');
    }
  }
};

var _global = require('$util/global.js');

var _global2 = _interopRequireDefault(_global);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];