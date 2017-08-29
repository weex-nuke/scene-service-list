'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../util/index');

var _commItem = require('../data/comm-item');

var _commItem2 = _interopRequireDefault(_commItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  invoke: function invoke() {
    return _index.Http.fetch({
      name: 'get-comm-list',
      data: {}
    }).then(function (result) {
      var payload = _commItem2.default.formatData(result);
      return payload;
    });
  }
};
module.exports = exports['default'];