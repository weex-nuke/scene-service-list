'use strict';

import { createElement, PureComponent } from 'rax';
import { View, Text, Image } from 'nuke';
import styles from './index.less';

class Item extends PureComponent {
  render() {
    return (
      <View style={[styles['comm-grid'], styles['item-containter'], this.props.index ? '' : styles['comm-border-top']]}>
        <Image style={styles['item-img']} src={this.props.pic_path} />
        <View style={styles['item-right']}>
          <Text style={styles['comm-subject']}>{this.props.title}</Text>
          {
            this.props.outer_iid && <Text style={styles['outer-iid']}>商家编码:{this.props.outer_iid}</Text>
          }
          <Text style={styles.sku}>{this.props.sku_properties_name}</Text>
          <View style={[styles['comm-col'], styles['price-containter']]}>
            <Text style={styles.price}>{this.props.price}</Text>
            <Text style={[styles.price, styles['price-split']]}>x</Text>
            <Text style={styles.price}>{this.props.num}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Item;
