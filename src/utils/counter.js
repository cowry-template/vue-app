/**
 * 通用倒计时封装，不依赖任何UI
 * 注意在组件销毁的时候要调用 stop 方法关闭倒计时
 * （可参考 /src/components/Timer）
 * @param {Number} options.remainderTime  剩余时间（时间戳毫秒）
 * @param {Function} options.onChange  每秒变化回调
 */
function Counter(options) {
  // start run
  start(options);

  return {
    stop: stop.bind(this, options),
  };
}

function calculate(time, options) {
  let hour = parseInt(time / 3600000, 10);
  let minute = parseInt((time % 3600000) / 60000, 10);
  let second = parseInt(((time % 3600000) % 60000) / 1000, 10);

  let remainderTimeStr = "";

  if (options.showSecond) {
    remainderTimeStr = `${parseInt(time / 1000, 10)} s`;
  } else {
    hour && (remainderTimeStr += `${hour}:`);
    minute && (remainderTimeStr += `${toDouble(minute)}:`);
    second && (remainderTimeStr += `${toDouble(second)}`);
  }

  if (typeof options.onChange === "function") {
    options.onChange({
      remainderTime: time,
      remainderTimeStr: remainderTimeStr,
      hour: hour,
      minute: minute,
      second: second,
    });
  }
}

function start(options) {
  let remainderTime = options.remainderTime;
  // 每次都重新获取时间，解决移动端锁屏倒计时不准确问题
  let viewTime = new Date().getTime();

  if (remainderTime > 0) calculate(remainderTime, options);

  clearInterval(options.countTimer);
  options.countTimer = setInterval(() => {
    let nowTime = new Date().getTime();
    let disTime = nowTime - viewTime;

    // to solve time is invalid
    disTime = parseInt(disTime / 1000, 10) * 1000;

    let actualTime = remainderTime - disTime;

    if (actualTime > 0) {
      calculate(actualTime, options);
    } else {
      stop(options);
    }
  }, 1000);
}

function stop(options) {
  clearInterval(options.countTimer);
  if (typeof options.onChange === "function") {
    options.onChange({
      remainderTime: 0,
      remainderTimeStr: "",
      stopped: true,
    });
  }
}

function toDouble(n) {
  return n < 10 ? "0" + n : n;
}

export default Counter;
