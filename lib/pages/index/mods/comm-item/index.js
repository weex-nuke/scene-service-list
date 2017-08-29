'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rax = require('rax');

var _nuke = require('nuke');

var _QAPSDK = require('QAP-SDK');

var _QAPSDK2 = _interopRequireDefault(_QAPSDK);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

var _index = require('./index.less');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommItem = function (_Component) {
  _inherits(CommItem, _Component);

  function CommItem(props) {
    _classCallCheck(this, CommItem);

    var _this = _possibleConstructorReturn(this, (CommItem.__proto__ || Object.getPrototypeOf(CommItem)).call(this, props));

    _this.checkChange = _this.checkChange.bind(_this);
    return _this;
  }

  _createClass(CommItem, [{
    key: 'checkChange',
    value: function checkChange(value) {
      // 触发事件，并发送数据
      _QAPSDK2.default.emit('Page.itemCheckChange', {
        value: value,
        item: this.props
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var header = {
        status: 0,
        statueText: '交易关闭',
        nickName: 'c测试账号001',
        index: this.props.index,
        tid: this.props.tid,
        timeText: '5分钟前拍下'
      };
      var showCheck = this.props.showCheck || false;

      var orderLength = this.props.orders.order.length;
      var tempOrders = this.props.orders.order && this.props.orders.order.slice(0, 2) || [];

      if (showCheck === 1) {
        header.status = 0;
      }

      return _rax.createElement(
        _nuke.View,
        null,
        _rax.createElement(
          _nuke.View,
          { style: [_index2.default['comm-grid'], _index2.default['item-header-contaiter']] },
          showCheck && _rax.createElement(_nuke.Checkbox, { checked: this.props.checked, onChange: this.checkChange, size: 'small' }),
          _rax.createElement(_header2.default, header)
        ),
        _rax.createElement(
          _nuke.View,
          { style: _index2.default['items-containter'] },
          tempOrders.map(function (item, index) {
            var tempObj = Object.assign(item, { index: index });
            return _rax.createElement(_item2.default, tempObj);
          })
        ),
        _rax.createElement(
          _nuke.View,
          { style: [_index2.default.postage, _index2.default['comm-border-bottom']] },
          _rax.createElement(
            _nuke.Text,
            { style: _index2.default['postage-text'] },
            '\u5171'
          ),
          _rax.createElement(
            _nuke.Text,
            { style: [_index2.default['postage-text'], _index2.default['postage-num']] },
            orderLength
          ),
          _rax.createElement(
            _nuke.Text,
            { style: _index2.default['postage-text'] },
            '\u4EF6\uFF0C\u5B9E\u6536'
          ),
          _rax.createElement(
            _nuke.Text,
            { style: [_index2.default['postage-text¬'], _index2.default['postage-payment']] },
            this.props.payment
          ),
          _rax.createElement(
            _nuke.Text,
            { style: [_index2.default['postage-text'], _index2.default['postage-cost']] },
            '(\u5305\u90AE)'
          ),
          _rax.createElement(
            _nuke.Text,
            { style: [_index2.default['postage-text'], _index2.default['postage-paytype']] },
            '\u4FE1\u7528\u5361'
          )
        )
      );
    }
  }]);

  return CommItem;
}(_rax.Component);

exports.default = CommItem;
module.exports = exports['default'];