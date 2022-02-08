export const colorBlue = "#1890FF";
export const colorWhite = "#FFFFFF";
export const colorGrey = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")).theme_color
  : "#F4F5F5";
