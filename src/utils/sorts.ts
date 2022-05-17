// highest value is first result
export const sortDescending = (arrOfObj: any[], key: string) => {
  return arrOfObj.sort((a, b) => b[key].localeCompare(a[key]));
};

// lowest value is first result
export const sortAscending = (arrOfObj: any[], key: string) => {
  return arrOfObj.sort((a, b) => a[key].localeCompare(b[key]));
};

// highest value is first result, most recent date
export const sortPosts = (arrOfObj: any[], key1: string, key2: string) => {
  return arrOfObj.sort((a, b) => b[key1][key2].localeCompare(a[key1][key2]));
};
