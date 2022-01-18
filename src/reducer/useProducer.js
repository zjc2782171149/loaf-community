// 用 useReducer 来设置页面需要用到的状态管理
import { colorBlue } from "../constant";
export const xxx = (state, action) => {
  switch (action.type) {
    case colorBlue:
      return action.userInfo;
    default:
      return state;
  }
};
