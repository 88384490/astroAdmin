export const setMenu = (list: any) => {
  sessionStorage.setItem("menus", JSON.stringify(list));
};

export const getMenu = () => {
  return JSON.parse(<string>sessionStorage.getItem("menus"));
};
