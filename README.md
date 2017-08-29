# nuke 通用列表 - 订单列表

订单列表是一个非常经典的场景，包含了一些简易的操作 + 网络请求。

组件使用方面，有 ListView, RefreshControl, Touchable 组合使用，布局等。
基于apimap实现数据服务的适配，二层结构数据适配层，mods模型层。
基于Context丛Parent向子组件传递一些全局数据，避免层层透传。

<img src="https://gw.alicdn.com/tfs/TB1gmjzXEgQMeJjy0FfXXbddXXa-720-1280.jpg" width="400" />

## 性能
基于PureComponent实现的组件，自动比较props是否变更，实现组件性能提升。基于QAP-SDK.on/emit事件注册机制，抹平跨组件的时候回调函数的层层传递，支持页面级别事件和应用级别事件。

[QNP-SDK传送门](https://g.alicdn.com/x-bridge/qap-sdk/2.1.3/docs/api/api-event.html)

## demo
- https://h5.m.taobao.com/qn/mobile/weex-tpl.html?_wx_tpl=https://g.alicdn.com/nuke-theme/scene-service-list/0.0.11/index.js

- 扫码体验：

<img src="https://gw.alicdn.com/tfs/TB1bfX_aogQMeJjy0FeXXXOEVXa-622-608.png" width="200" />

## 场景简介

bug 联系： @云易
