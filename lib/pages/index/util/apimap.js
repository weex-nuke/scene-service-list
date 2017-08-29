/*
 * Copyright (c) 2017 alibbaba-inc
 * 数据mock详情见：http://site.alibaba.net/nuke/docs_tools/fie-toolkit-nuke/mock.html
*/

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var api = {
  local: {
    'get-comm-list': { // fetch请求
      type: 'jsonp',
      value: '../service/local.json'
    },
    'mtop.demo': { // mtop请求
      type: 'jsonp',
      value: '../service/mtop.json'
    }
  },
  product: {
    'get-comm-list': { // fetch请求
      type: 'jsonp',
      value: 'https://www.easy-mock.com/mock/598ac2dda1d30433d85aca73/example/list'
    },
    'mtop.demo': { // mtop请求
      type: 'mtop',
      value: 'mtop.order.querySoldList'
    }
  }
};

exports.default = api;
module.exports = exports['default'];