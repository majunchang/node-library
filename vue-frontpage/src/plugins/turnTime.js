/**
 * Created by majunchang on 2017/7/18.
 */
export function turntoDate(time) {
  var d = new Date(time);
  //根据时间戳生成的时间对象
  var date = (d.getFullYear()) + "年" +
    (d.getMonth() + 1) + "月" +
    (d.getDate())+'日'
  return date;
}


// 另外一种时间转换函数 原理是一样的
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'Y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
