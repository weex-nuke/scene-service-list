export default {
  // 截取ID
  getURLParameter(name) {
    return decodeURIComponent((new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`).exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
  },
  // 格式化数据
  partiNumberFormat(num) {
    let format = num;
    if (num > 10000) {
      format = `${(num / 10000).toFixed(1).toString()}万`;
    } else {
      format = num.toString();
    }
    return format;
  },
  // 跳转链接
  // 1普通图文,11三图文,16大图类型,9图文直播,10视频直播,6专题,13话题pk
  getUrl(id, attachmentSt) {
    let event; let parameter;
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
    return `tbsellerplatform://?session_event=event_protocol&from=fm.msg.0.0&apiName=${event}&biz=${encodeURIComponent(JSON.stringify(parameter))}`;
  },
  // 格式化时间(PC 端)
  dataTimes(data) {
    const time = new Date(data);
    const m = time.getMonth() + 1;
    const d = time.getDate();
    const h = time.getHours();
    const mm = time.getMinutes();
    return `${this.add0(m)}月${this.add0(d)}日 ${this.add0(h)}:${this.add0(mm)}`;
  },
  add0(m) {
    return m < 10 ? `0${m}` : m;
  },
  // 格式化时间 （移动端）
  formatSeconds(value) {
    let theTime = parseInt(value, 10); // 秒
    let result;
    let theTime1 = 0; // 分
    let theTime2 = 0; // 小时
    if (theTime <= 60) {
      result = `00'${this.add0(parseInt(theTime, 10))}'`;
    } else {
      theTime1 = parseInt(theTime / 60, 10);
      theTime = parseInt(theTime % 60, 10);
      if (theTime1 > 60) {
        theTime2 = parseInt(theTime1 / 60, 10);
        theTime1 = parseInt(theTime1 % 60, 10);
      }

      if (theTime1 > 0) {
        result = `${this.add0(parseInt(theTime1, 10))}'${this.add0(parseInt(theTime, 10))}'`;
      }
      if (theTime2 > 0) {
        result = `${this.add0(parseInt(theTime2, 10))}'${this.add0(parseInt(theTime, 10))}'`;
      }
    }
    return result;
  },
};
