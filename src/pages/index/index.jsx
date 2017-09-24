'use strict';

import { createElement, Component, PropTypes, render } from 'rax';
import { View, Text, Checkbox, Image, ListView, RefreshControl, Touchable } from 'nuke';
import Emitter from 'component-emitter';
import CommItem from './mods/comm-item/index';
import CommItemServiceAdapter from './apapter/service/comm-item';
import styles from './index.less';

const App = class ServiceListIndex extends Component {
  constructor() {
    super();

    this.state = {
      sellectAll: false,
      hasSelectAll: false,
      data: [],
      isRefreshing: false,
      showLoading: true,
      refreshText: '↓ 下拉刷新',
      hasNext: true,
      showFooter: true,
    };
    this.page = 1;

    this.emitter = new Emitter();

    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.openSellect = this.openSellect.bind(this);
    this.chooseAll = this.chooseAll.bind(this);

    this.itemCheckChange = this.itemCheckChange.bind(this);
    this.pressHeadHandle = this.pressHeadHandle.bind(this);
  }

  /**
   * 使用getChildContext方法将属性传递给子组件，并使用childContextTypes声明传递数据类型
   * 设置传递给子组件的属性，可以覆盖，也可以新增。
   * @returns {{emitter: Emitter}}
   */
  getChildContext() {
    return {
      emitter: this.emitter,
    };
  }

  /**
   * init的时候挂载数据
   */
  componentWillMount() {
    const self = this;
    this.fetchData().then((data) => {
      this.setState({
        data,
      });
    });

    /**
     * 事件注册
     */
    /**
     * 事件注册
     */
    this.emitter.on('Page.itemCheckChange', (data) => {
      self.itemCheckChange(data);
    });

    this.emitter.on('Page.pressHeadHandle', (data) => {
      self.pressHeadHandle(data);
    });


    /* QN.top('taobao.trades.sold.get', {
      type: 'fixed,auction,guarantee_trade,step,independent_simple_trade,independent_shop_trade,auto_delivery,ec,cod,game_equipment,shopex_trade,netcn_trade,external_trade,instant_trade,b2c_cod,hotel_trade,super_market_trade,super_market_cod_trade,taohua,waimai,o2o_offlinetrade,nopaid,step,eticket,tmall_i18n,nopaid,insurance_plus,finance,pre_auth_type',
      fields: 'seller_nick,buyer_nick,title,type,created,tid,seller_rate,buyer_rate,status,payment,discount_fee,adjust_fee,post_fee,total_fee,pay_time,end_time,modified,consign_time,buyer_obtain_point_fee,point_fee,real_point_fee,received_payment,commission_fee,buyer_memo,seller_memo,alipay_no,buyer_message,pic_path,num_iid,num,price,cod_fee,cod_status,shipping_type, is_daixiao,is_part_consign,consign_interval,arrive_interval,arrive_cut_time,orders, trade_from,credit_card_fee',
    }).then((data) => {
      console.log(data);
    }, (error) => {
      console.warn('get data fail', error);
    });*/
  }

  fetchData() {
    return CommItemServiceAdapter.invoke().then(response => response);
  }

  itemCheckChange(data) {
    const tempData = this.state.data;
    const index = data.item.index;
    const value = data.changeValue;

    tempData[index].checked = value;

    // 改变状态
    this.setState({
      data: tempData,
    });
    alert(JSON.stringify(data));
  }

  pressHeadHandle(data) {
    alert(JSON.stringify(data));
  }

  openSellect() {
    const tempStatus = !this.state.sellectAll;
    const tempData = this.state.data;
    // openStyles = tempStatus ? { opacity: '1', bottom: '0' } : { opacity: '0', bottom: '-102rem' };

    // 找到要操作的容器
    // const box = findDOMNode(this.refs.overlay);

    // 应用变形效果
    /* Transition(box, openStyles, {
     timingFunction: 'linear',
     delay: 0,
     duration: 500
     });*/

    if (tempStatus) {
      tempData.forEach((item) => {
        item.showCheck = tempStatus;
        item.checked = false;
      });

      // 改变状态
      this.setState({
        sellectAll: tempStatus,
        data: tempData,
      });
    } else {
      tempData.forEach((item) => {
        item.showCheck = tempStatus;
      });

      // 改变状态
      this.setState({
        sellectAll: tempStatus,
        data: tempData,
        hasSelectAll: tempStatus,
      });
    }
  }

  chooseAll(value) {
    const tempData = this.state.data;

    tempData.forEach((item) => {
      item.checked = value;
    });

    this.setState({
      hasSelectAll: value,
      data: tempData,
    });
  }

  handleRefresh() {
    this.setState({
      isRefreshing: true,
      refreshText: '加载中',
      hasNext: true,
      showFooter: true,
    });

    this.fetchData().then((data) => {
      // 模拟慢速网络
      setTimeout(() => {
        this.setState({
          sellectAll: false,
          hasSelectAll: false,
          data,
          refreshText: '↓ 下拉刷新',
          isRefreshing: false,
        });
      }, 2000);
    });
  }

  handleLoadMore() {
    this.page = this.page + 1;

    this.fetchData().then((data) => {
      this.setState({ data: this.state.data.concat(data) });
    });
  }

  renderItem(item) {
    if (item == null) {
      return;
    }
    let msg;
    switch (item.attachmentSt) {
      case 1:
        msg = <CommItem {...item} />;
        break;
      default:
        msg = <CommItem {...item} />;
        break;
    }
    return msg;
  }

  /**
   * 渲染头部
   * @returns {XML}
   */
  renderHeader() {
    return (
      <RefreshControl style={styles.refresh} refreshing={this.state.isRefreshing} onRefresh={this.handleRefresh}>
        <Text style={styles.refreshText}>{this.state.refreshText}</Text>
      </RefreshControl>
    );
  }

  /**
   * 渲染尾部
   * @returns {*}
   */
  renderFooter() {
    if (this.state.hasNext) {
      return (
        <View style={[styles.footerLoading]}><Image
          src={'//img.alicdn.com/tfs/TB1jZUQRXXXXXcpXpXXXXXXXXXX-100-100.gif?getAvatar=avatar'}
          style={{ width: 100, height: 100 }}
        /></View>
      );
    } else if (this.state.showFooter) {
      return (<View style={[styles.footerLoading]}><Text style={styles.footerText}>没有了~</Text></View>);
    }
    return null;
  }

  renderAction() {
    return (
      <Touchable onPress={this.openSellect} style={styles['sellect-all']}>
        <Text style={styles['sellect-all-text']}>{this.state.sellectAll ? '取消' : '全选'}</Text>
      </Touchable>
    );
  }

  renderToolBtns() {
    return (
      <Touchable style={styles['tool-btn']} ref="overlay">
        <View style={[styles['tool-btn-item'], styles['tool-btn-one']]}>
          <Checkbox size="small" checked={this.state.hasSelectAll} onChange={this.chooseAll} />
          <Text style={styles['tool-btn-one-text']}>全选</Text>
        </View>
        <Text style={[styles['tool-btn-item'], styles['tool-btn-two']]}>批量备注</Text>
      </Touchable>
    );
  }

  /**
   * 展现一个数据列表
   * justify-content属性定义了项目在主轴上的对齐方式。(X轴)
   * align-items属性定义项目在交叉轴上如何对齐。(Y轴)
   * @returns {XML}
   *
   */
  render() {
    return (
      <View style={styles.containter}>
        {this.renderAction()}

        <ListView
          renderRow={this.renderItem}
          dataSource={this.state.data}
          onEndReached={this.handleLoadMore}
          renderHeader={this.renderHeader}
          renderFooter={this.renderFooter}
        />

        {this.state.sellectAll && this.renderToolBtns()}
      </View>
    );
  }
};

/**
 * 声明传递给子组件的属性的数据类型。
 * @type {{emitter: (string|*)}}
 */
App.childContextTypes = {
  emitter: PropTypes.object,
};

render(<App />);
