'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Http = undefined;

var _fetch = require('./request/fetch');

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Http = exports.Http = {
  fetch: _fetch2.default
};