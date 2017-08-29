'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CommItemAdapter = {
  formatData: function formatData(tempArray) {
    var newData = [];

    tempArray && tempArray.forEach(function (item, index) {
      var tempOrder = {};
      tempOrder.tid = item.tid;
      tempOrder.index = index;
      tempOrder.payment = item.payment;
      tempOrder.created = item.created;
      tempOrder.buyerNick = item.buyer_nick;
      tempOrder.orders = item.orders;

      newData.push(tempOrder);
    }, undefined);
    return newData;
  }
};

exports.default = CommItemAdapter;
module.exports = exports['default'];