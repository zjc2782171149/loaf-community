const tabs = { index: 1 };
export const headerChange = (state, action) => {
  switch (action.index) {
    case "1":
      return { index: tabs.index };
    case "2":
      return { index: 2 };
    case "3":
      return { index: 3 };
    default:
      throw new Error();
  }
};
