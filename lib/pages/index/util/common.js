'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  // 截取ID
  getURLParameter: function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
  },

  // 格式化数据
  partiNumberFormat: function partiNumberFormat(num) {
    var format = num;
    if (num > 10000) {
      format = (num / 10000).toFixed(1).toString() + '\u4E07';
    } else {
      format = num.toString();
    }
    return format;
  },

  // 跳转链接
  // 1普通图文,11三图文,16大图类型,9图文直播,10视频直播,6专题,13话题pk
  getUrl: function getUrl(id, attachmentSt) {
    var event = void 0;var parameter = void 0;
    if (attachmentSt === 1 || attachmentSt === 11 || attachmentSt === 16) {
      // 普通feeds (1) 三图文feeds（11） 大图类型（16）
      event = 'openWebsite';
      parameter = { msg_id: id };
    } else if (attachmentSt === 6) {
      // 专题 （6）
      event = 'openHeadlineSubject';
      parameter = { subjectId: id };
    } else if (attachmentSt === 10) {
      // 视频直播 (10)
      event = 'openVideo';
      parameter = { biz_id: id };
    } else if (attachmentSt === 9) {
      // 图文直播 (9)
      event = 'openBackWebsite';
      parameter = { url: 'https://h5.m.taobao.com/qn/mobile/niuba-interview.html#/liveshow/{id}/'.replace(/{id}/, id) };
    } else if (attachmentSt === 13) {
      // 图文直播 (9)
      event = 'openWebsite';
      parameter = { url: 'https://h5.m.taobao.com/qn/mobile/niuba-feeds.html#/pk/{id}/'.replace(/{id}/, id) };
    }
    return 'tbsellerplatform://?session_event=event_protocol&from=fm.msg.0.0&apiName=' + event + '&biz=' + encodeURIComponent(JSON.stringify(parameter));
  },

  // 格式化时间(PC 端)
  dataTimes: function dataTimes(data) {
    var time = new Date(data);
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    return this.add0(m) + '\u6708' + this.add0(d) + '\u65E5 ' + this.add0(h) + ':' + this.add0(mm);
  },
  add0: function add0(m) {
    return m < 10 ? '0' + m : m;
  },

  // 格式化时间 （移动端）
  formatSeconds: function formatSeconds(value) {
    var theTime = parseInt(value, 10); // 秒
    var result = void 0;
    var theTime1 = 0; // 分
    var theTime2 = 0; // 小时
    if (theTime <= 60) {
      result = '00\'' + this.add0(parseInt(theTime, 10)) + '\'';
    } else {
      theTime1 = parseInt(theTime / 60, 10);
      theTime = parseInt(theTime % 60, 10);
      if (theTime1 > 60) {
        theTime2 = parseInt(theTime1 / 60, 10);
        theTime1 = parseInt(theTime1 % 60, 10);
      }

      if (theTime1 > 0) {
        result = this.add0(parseInt(theTime1, 10)) + '\'' + this.add0(parseInt(theTime, 10)) + '\'';
      }
      if (theTime2 > 0) {
        result = this.add0(parseInt(theTime2, 10)) + '\'' + this.add0(parseInt(theTime, 10)) + '\'';
      }
    }
    return result;
  }
};
module.exports = exports['default'];