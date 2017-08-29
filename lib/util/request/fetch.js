'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (param) {
  return (0, _dataSource2.default)(param, _apimap2.default);
};

var _apimap = require('../apimap');

var _apimap2 = _interopRequireDefault(_apimap);

var _dataSource = require('../data-source');

var _dataSource2 = _interopRequireDefault(_dataSource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];