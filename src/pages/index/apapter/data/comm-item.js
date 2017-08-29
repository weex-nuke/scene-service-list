'use strict';

const CommItemAdapter = {
  formatData: (tempArray) => {
    const newData = [];

    tempArray && tempArray.forEach((item, index) => {
      const tempOrder = {};
      tempOrder.tid = item.tid;
      tempOrder.index = index;
      tempOrder.payment = item.payment;
      tempOrder.created = item.created;
      tempOrder.buyerNick = item.buyer_nick;
      tempOrder.orders = item.orders;

      newData.push(tempOrder);
    }, this);
    return newData;
  },
};

export default CommItemAdapter;
