'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rax = require('rax');

var _nuke = require('nuke');

var _QAPSDK = require('QAP-SDK');

var _QAPSDK2 = _interopRequireDefault(_QAPSDK);

var _index = require('./mods/comm-item/index');

var _index2 = _interopRequireDefault(_index);

var _commItem = require('./apapter/service/comm-item');

var _commItem2 = _interopRequireDefault(_commItem);

var _index3 = require('./index.less');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(ServiceListIndex, _Component);

  function ServiceListIndex() {
    _classCallCheck(this, ServiceListIndex);

    var _this = _possibleConstructorReturn(this, (ServiceListIndex.__proto__ || Object.getPrototypeOf(ServiceListIndex)).call(this));

    _this.state = {
      sellectAll: false,
      hasSelectAll: false,
      data: [],
      isRefreshing: false,
      showLoading: true,
      refreshText: '↓ 下拉刷新',
      hasNext: true,
      showFooter: true
    };
    _this.page = 1;

    _this.handleLoadMore = _this.handleLoadMore.bind(_this);
    _this.handleRefresh = _this.handleRefresh.bind(_this);
    _this.renderHeader = _this.renderHeader.bind(_this);
    _this.renderFooter = _this.renderFooter.bind(_this);
    _this.renderItem = _this.renderItem.bind(_this);

    _this.openSellect = _this.openSellect.bind(_this);
    _this.chooseAll = _this.chooseAll.bind(_this);

    _this.itemCheckChange = _this.itemCheckChange.bind(_this);
    _this.pressHeadHandle = _this.pressHeadHandle.bind(_this);
    return _this;
  }

  /**
   * init的时候挂载数据
   */


  _createClass(ServiceListIndex, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var self = this;
      this.fetchData().then(function (data) {
        _this2.setState({
          data: data
        });
      });

      /**
       * 事件注册
       */
      _QAPSDK2.default.on('Page.itemCheckChange', function (data) {
        self.itemCheckChange(data);
      });

      _QAPSDK2.default.on('Page.pressHeadHandle', function (data) {
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
  }, {
    key: 'fetchData',
    value: function fetchData() {
      return _commItem2.default.invoke().then(function (response) {
        return response;
      });
    }
  }, {
    key: 'itemCheckChange',
    value: function itemCheckChange(data) {
      var tempData = this.state.data;
      var index = data.item.index;
      var value = data.value;

      tempData[index].checked = value;

      // 改变状态
      this.setState({
        data: tempData
      });
    }
  }, {
    key: 'pressHeadHandle',
    value: function pressHeadHandle(data) {
      alert(JSON.stringify(data));
    }
  }, {
    key: 'openSellect',
    value: function openSellect() {
      var tempStatus = !this.state.sellectAll;
      var tempData = this.state.data;
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
        tempData.forEach(function (item) {
          item.showCheck = tempStatus;
          item.checked = false;
        });

        // 改变状态
        this.setState({
          sellectAll: tempStatus,
          data: tempData
        });
      } else {
        tempData.forEach(function (item) {
          item.showCheck = tempStatus;
        });

        // 改变状态
        this.setState({
          sellectAll: tempStatus,
          data: tempData,
          hasSelectAll: tempStatus
        });
      }
    }
  }, {
    key: 'chooseAll',
    value: function chooseAll(value) {
      var tempData = this.state.data;

      tempData.forEach(function (item) {
        item.checked = value;
      });

      this.setState({
        hasSelectAll: value,
        data: tempData
      });
    }
  }, {
    key: 'handleRefresh',
    value: function handleRefresh() {
      var _this3 = this;

      this.setState({
        isRefreshing: true,
        refreshText: '加载中',
        hasNext: true,
        showFooter: true
      });

      this.fetchData().then(function (data) {
        _QAPSDK2.default.toast({
          query: {
            text: '延时2s完成'
          }
        });
        // 模拟慢速网络
        setTimeout(function () {
          _this3.setState({
            sellectAll: false,
            hasSelectAll: false,
            data: data,
            refreshText: '↓ 下拉刷新',
            isRefreshing: false
          });
        }, 2000);
      });
    }
  }, {
    key: 'handleLoadMore',
    value: function handleLoadMore() {
      var _this4 = this;

      this.page = this.page + 1;

      this.fetchData().then(function (data) {
        _this4.setState({ data: _this4.state.data.concat(data) });
      });
    }
  }, {
    key: 'renderItem',
    value: function renderItem(item) {
      if (item == null) {
        return;
      }

      var msg = void 0;
      switch (item.attachmentSt) {
        case 1:
          msg = _rax.createElement(_index2.default, item);
          break;
        default:
          msg = _rax.createElement(_index2.default, item);
          break;
      }
      return msg;
    }

    /**
     * 渲染头部
     * @returns {XML}
     */

  }, {
    key: 'renderHeader',
    value: function renderHeader() {
      return _rax.createElement(
        _nuke.RefreshControl,
        { style: _index4.default.refresh, refreshing: this.state.isRefreshing, onRefresh: this.handleRefresh },
        _rax.createElement(
          _nuke.Text,
          { style: _index4.default.refreshText },
          this.state.refreshText
        )
      );
    }

    /**
     * 渲染尾部
     * @returns {*}
     */

  }, {
    key: 'renderFooter',
    value: function renderFooter() {
      if (this.state.hasNext) {
        return _rax.createElement(
          _nuke.View,
          { style: [_index4.default.footerLoading] },
          _rax.createElement(_nuke.Image, {
            src: '//img.alicdn.com/tfs/TB1jZUQRXXXXXcpXpXXXXXXXXXX-100-100.gif?getAvatar=avatar',
            style: { width: 100, height: 100 }
          })
        );
      } else if (this.state.showFooter) {
        return _rax.createElement(
          _nuke.View,
          { style: [_index4.default.footerLoading] },
          _rax.createElement(
            _nuke.Text,
            { style: _index4.default.footerText },
            '\u6CA1\u6709\u4E86~'
          )
        );
      }
      return null;
    }
  }, {
    key: 'renderAction',
    value: function renderAction() {
      return _rax.createElement(
        _nuke.Touchable,
        { onPress: this.openSellect, style: _index4.default['sellect-all'] },
        _rax.createElement(
          _nuke.Text,
          { style: _index4.default['sellect-all-text'] },
          this.state.sellectAll ? '取消' : '全选'
        )
      );
    }
  }, {
    key: 'renderToolBtns',
    value: function renderToolBtns() {
      return _rax.createElement(
        _nuke.Touchable,
        { style: _index4.default['tool-btn'], ref: 'overlay' },
        _rax.createElement(
          _nuke.View,
          { style: [_index4.default['tool-btn-item'], _index4.default['tool-btn-one']] },
          _rax.createElement(_nuke.Checkbox, { size: 'small', checked: this.state.hasSelectAll, onChange: this.chooseAll }),
          _rax.createElement(
            _nuke.Text,
            { style: _index4.default['tool-btn-one-text'] },
            '\u5168\u9009'
          )
        ),
        _rax.createElement(
          _nuke.Text,
          { style: [_index4.default['tool-btn-item'], _index4.default['tool-btn-two']] },
          '\u6279\u91CF\u5907\u6CE8'
        )
      );
    }

    /**
     * 展现一个数据列表
     * justify-content属性定义了项目在主轴上的对齐方式。(X轴)
     * align-items属性定义项目在交叉轴上如何对齐。(Y轴)
     * @returns {XML}
     *
     */

  }, {
    key: 'render',
    value: function render() {
      return _rax.createElement(
        _nuke.View,
        { style: _index4.default.containter },
        this.renderAction(),
        _rax.createElement(_nuke.ListView, {
          renderRow: this.renderItem,
          dataSource: this.state.data,
          onEndReached: this.handleLoadMore,
          renderHeader: this.renderHeader,
          renderFooter: this.renderFooter
        }),
        this.state.sellectAll && this.renderToolBtns()
      );
    }
  }]);

  return ServiceListIndex;
}(_rax.Component);

(0, _rax.render)(_rax.createElement(App, null));