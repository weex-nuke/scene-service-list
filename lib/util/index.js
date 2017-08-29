'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NameSpace = exports.Http = undefined;

var _fetch = require('./request/fetch');

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 其他接口接口封装可在Http中透出此处透出
 */
var Http = exports.Http = {
  fetch: _fetch2.default
};

var NameSpace = exports.NameSpace = function NameSpace(name) {
  return function (v) {
    return name + '-' + v;
  };
};