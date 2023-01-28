import store from "store";
export const TOKEN_KEY = "__APP_TOKEN__";

export function setToken2Store(v) {
  store.set(TOKEN_KEY, v);
}
export function getToken8Store() {
  return store.get(TOKEN_KEY) || "";
}

export const downloadFile = (data, title, fileType) => {
  let blob = new Blob([data], {
    type: fileType
      ? "text/csv,charset=UTF-8"
      : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
  });

  let url = window.URL.createObjectURL(blob);
  const link = document.createElement("a"); // 创建a标签
  link.href = url;
  link.download = title || "list";
  link.click();
  URL.revokeObjectURL(url); // 释放内存
};

export const downloadPdf = (data, title) => {
  let blob = new Blob([data], {
    // type: 'application/pdf',
    type: "application/octet-stream",
    "Content-Disposition": "attachment",
  });
  let url = window.URL.createObjectURL(blob);
  const link = document.createElement("a"); // 创建a标签
  link.href = url;
  link.download = title || "附件";
  link.click();
  URL.revokeObjectURL(url); // 释放内存
};

// 获取 交集
export function intersection(arr1, arr2) {
  return arr1.filter((val) => arr2.indexOf(val) > -1);
}

//补集 两个数组各自没有的集合
export function complement(arr1, arr2) {
  return arr1
    .filter(function (val) {
      return !(arr2.indexOf(val) > -1);
    })
    .concat(
      arr2.filter(function (val) {
        return !(arr1.indexOf(val) > -1);
      })
    );
}

// 生成 guid
export function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 判断是否是 guid
export const isGuid = (str) => {
  const list = str.split("-");
  return list.length == 5 && str.length == 36;
};

// 生成随机数
export function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// 格式化金额
export function fmtMoney(val) {
  if (!val) return "0.00";
  //金额转换 分->元 保留2位小数 并每隔3位用逗号分开 1,234.56
  var str = (Math.floor((val * 100).toFixed()) / 100).toFixed(2) + "";
  var intSum = str
    .substring(0, str.indexOf("."))
    .replace(/\B(?=(?:\d{3})+$)/g, ","); //取到整数部分
  var dot = str.substring(str.length, str.indexOf(".")); //取到小数部分搜索
  var ret = intSum + dot;
  return ret;
}

// 判断字符串是否为空
export function isEmptyStr(str) {
  if (str == "" || str == null) return true;
  let ret = str.replace(/\s+/g, "");
  return !ret;
}

// 格式化数量
export function fmtCount(val) {
  if (!val) return "0";
  return String(val).replace(/\B(?=(?:\d{3})+$)/g, ",");
}

export const toFixed = (num, n = 2) => {
  return num.toFixed(n) * 1;
};

export function fmtBankNum(str, format = "$1 **** **** $2") {
  return String(str).replace(/^(.{4})(?:\d+)(.{4})$/, format);
}
