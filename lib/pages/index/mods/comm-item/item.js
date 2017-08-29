'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rax = require('rax');

var _nuke = require('nuke');

var _index = require('./index.less');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = function (_PureComponent) {
  _inherits(Item, _PureComponent);

  function Item() {
    _classCallCheck(this, Item);

    return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
  }

  _createClass(Item, [{
    key: 'render',
    value: function render() {

      return _rax.createElement(
        _nuke.View,
        { style: [_index2.default['comm-grid'], _index2.default['item-containter'], this.props.index ? '' : _index2.default['comm-border-top']] },
        _rax.createElement(_nuke.Image, { style: _index2.default['item-img'], src: this.props.pic_path }),
        _rax.createElement(
          _nuke.View,
          { style: _index2.default['item-right'] },
          _rax.createElement(
            _nuke.Text,
            { style: _index2.default['comm-subject'] },
            this.props.title
          ),
          this.props.outer_iid && _rax.createElement(
            _nuke.Text,
            { style: _index2.default['outer-iid'] },
            '\u5546\u5BB6\u7F16\u7801:',
            this.props.outer_iid
          ),
          _rax.createElement(
            _nuke.Text,
            { style: _index2.default.sku },
            this.props.sku_properties_name
          ),
          _rax.createElement(
            _nuke.View,
            { style: [_index2.default['comm-col'], _index2.default['price-containter']] },
            _rax.createElement(
              _nuke.Text,
              { style: _index2.default.price },
              this.props.price
            ),
            _rax.createElement(
              _nuke.Text,
              { style: [_index2.default.price, _index2.default['price-split']] },
              'x'
            ),
            _rax.createElement(
              _nuke.Text,
              { style: _index2.default.price },
              this.props.num
            )
          )
        )
      );
    }
  }]);

  return Item;
}(_rax.PureComponent);

exports.default = Item;
module.exports = exports['default'];