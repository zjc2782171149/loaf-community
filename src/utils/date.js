// 根据日期时间戳将日期
export const formatDate = (now) => {
  if (!now) return "时间数据有误";
  now = new Date(Number(now));
  const year = now.getFullYear();
  const month =
    now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
  const day = now.getDay() < 10 ? "0" + now.getDay() : now.getDay();
  const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minute =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const endTime = year + "-" + month + "-" + day + " " + hour + ":" + minute;
  return endTime;
};
