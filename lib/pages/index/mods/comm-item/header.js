'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rax = require('rax');

var _nuke = require('nuke');

var _QAPSDK = require('QAP-SDK');

var _QAPSDK2 = _interopRequireDefault(_QAPSDK);

var _index = require('./index.less');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_PureComponent) {
  _inherits(Header, _PureComponent);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

    _this.pressHeadHandle = _this.pressHeadHandle.bind(_this);
    return _this;
  }

  _createClass(Header, [{
    key: 'pressHeadHandle',
    value: function pressHeadHandle() {
      // 触发事件，并发送数据
      _QAPSDK2.default.emit('Page.pressHeadHandle', { headObj: this.props });
    }
  }, {
    key: 'render',
    value: function render() {

      return _rax.createElement(
        _nuke.Touchable,
        { style: _index2.default['header-contaiter'], onPress: this.pressHeadHandle },
        _rax.createElement(
          _nuke.View,
          { style: _index2.default['comm-grid'] },
          _rax.createElement(
            _nuke.View,
            { style: _index2.default['comm-col'] },
            _rax.createElement(
              _nuke.Text,
              { style: _index2.default['header-status'] },
              this.props.statueText
            ),
            _rax.createElement(_nuke.Icon, { style: _index2.default['header-icon'], name: 'display' }),
            _rax.createElement(
              _nuke.Text,
              { style: _index2.default['header-nickName'] },
              this.props.nickName
            )
          ),
          _rax.createElement(
            _nuke.Text,
            { style: _index2.default['header-index'] },
            '#',
            this.props.index + 1
          )
        ),
        _rax.createElement(
          _nuke.View,
          { style: [_index2.default['comm-grid'], _index2.default['comm-top5']] },
          _rax.createElement(
            _nuke.Text,
            { style: _index2.default['header-tid'] },
            this.props.tid
          ),
          _rax.createElement(
            _nuke.Text,
            { style: _index2.default['header-time'] },
            this.props.timeText
          )
        )
      );
    }
  }]);

  return Header;
}(_rax.PureComponent);

exports.default = Header;
module.exports = exports['default'];