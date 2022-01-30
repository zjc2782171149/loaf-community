// 根据日期时间戳将日期
export const formatDate = (now) => {
  if (!now) return "时间数据有误";
  now = new Date(Number(now));
  var year = now.getFullYear();
  var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : "";
  var day = now.getDay() < 10 ? "0" + now.getDay() : "";
  var endTime = year + "" + month + "" + day;
  return endTime;
};
