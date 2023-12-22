export const setItemToLocalStorage = (key: string, data: any) => {
  const serializeData = JSON.stringify(data);
  localStorage.setItem(`${key}`, serializeData);
};
export const getItemToLocalStorage = (key: string) => {
  const a: any = localStorage.getItem(`${key}`);
  return JSON.parse(a);
};
export const clearItemToLocalStorage = () => {
  localStorage.clear();
};
export const removeItemFromLocalStorage = (key: string) => {
  if (localStorage.getItem(key) != null) {
    localStorage.removeItem(key);
  }
};
