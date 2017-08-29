'use strict';

import { createElement, Component, PropTypes } from 'rax';
import { View, Text, Checkbox } from 'nuke';
import Header from './header';
import Item from './item';
import styles from './index.less';

class CommItem extends Component {
  constructor(props, context) {
    super(props, context);

    // 需要传递进context参数才可以在constructor方法中使用context，要不然会报错。
    this.emitter = this.context.emitter;
    this.checkChange = this.checkChange.bind(this);
  }

  checkChange(value) {
    // 触发事件，并发送数据
    this.emitter.emit('Page.itemCheckChange', {
      changeValue: value,
      item: this.props,
    });
  }

  render() {
    const header = {
      status: 0,
      statueText: '交易关闭',
      nickName: 'c测试账号001',
      index: this.props.index,
      tid: this.props.tid,
      timeText: '5分钟前拍下',
      emitter: this.props.emitter,
    };
    const showCheck = this.props.showCheck || false;

    const orderLength = this.props.orders.order.length;
    const tempOrders = (this.props.orders.order && this.props.orders.order.slice(0, 2)) || [];

    if (showCheck === 1) {
      header.status = 0;
    }

    return (
      <View>
        <View style={[styles['comm-grid'], styles['item-header-contaiter']]}>
          {showCheck && <Checkbox checked={this.props.checked} onChange={this.checkChange} size="small"/>}
          <Header {...header} />
        </View>

        <View style={styles['items-containter']}>
          {tempOrders.map((item, index) => {
            const tempObj = Object.assign(item, { index });
            return (<Item {...tempObj} />);
          })}
        </View>

        <View style={[styles.postage, styles['comm-border-bottom']]}>
          <Text style={styles['postage-text']}>共</Text>
          <Text style={[styles['postage-text'], styles['postage-num']]}>{orderLength}</Text>
          <Text style={styles['postage-text']}>件，实收</Text>
          <Text style={[styles['postage-text¬'], styles['postage-payment']]}>{this.props.payment}</Text>
          <Text style={[styles['postage-text'], styles['postage-cost']]}>(包邮)</Text>
          <Text style={[styles['postage-text'], styles['postage-paytype']]}>信用卡</Text>
        </View>
      </View>
    );
  }
}

CommItem.contextTypes = {
  emitter: PropTypes.object,
};

export default CommItem;
