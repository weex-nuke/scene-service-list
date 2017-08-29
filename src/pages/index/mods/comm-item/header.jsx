'use strict';

import { createElement, PureComponent, PropTypes } from 'rax';
import { View, Text, Icon, Touchable } from 'nuke';
import styles from './index.less';

class Header extends PureComponent {
  constructor(props, context) {
    super(props, context);

    // 需要传递进context参数才可以在constructor方法中使用context，要不然会报错。
    this.emitter = this.context.emitter;
    this.pressHeadHandle = this.pressHeadHandle.bind(this);
  }

  pressHeadHandle() {
    // 触发事件，并发送数据
    this.emitter.emit('Page.pressHeadHandle', { headObj: this.props });
  }

  render() {
    return (
      <Touchable style={styles['header-contaiter']} onPress={this.pressHeadHandle}>
        <View style={styles['comm-grid']}>
          <View style={styles['comm-col']}>
            <Text style={styles['header-status']}>{this.props.statueText}</Text>
            <Icon style={styles['header-icon']} name={'display'}/>
            <Text style={styles['header-nickName']}>{this.props.nickName}</Text>
          </View>
          <Text style={styles['header-index']}>#{this.props.index + 1}</Text>
        </View>

        <View style={[styles['comm-grid'], styles['comm-top5']]}>
          <Text style={styles['header-tid']}>{this.props.tid}</Text>
          <Text style={styles['header-time']}>{this.props.timeText}</Text>
        </View>func
      </Touchable>
    );
  }
}

/**
 * 子组件中需要显式地使用contextTypes声明需要用到的属性的数据类型。
 * 当需要在当前组件使用从上级组件传入的context的属性时，需要为用到的属性声明数据类型
 * @type {{emitter: (string|*)}}
 */
Header.contextTypes = {
  emitter: PropTypes.object,
};

export default Header;
