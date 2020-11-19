export const summaryMoney = (data: any[]) => {
  if (data.length <= 0) return 0;
  const formatter = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'usd',
  });

  return formatter.format(
    data.reduce((prev: any, next: any) => {
      return +prev + +next;
    }),
  );
};

export const getUnique = (arr: any, comp: any) => {
  // store the comparison  values in array
  const unique = arr
    .map((e: any) => e[comp])

    // store the indexes of the unique objects
    .map((e: any, i: any, final: any) => final.indexOf(e) === i && i)

    // eliminate the false indexes & return unique objects
    .filter((e: any) => arr[e])
    .map((e: any) => arr[e]);

  return unique;
};

export const filterArrayWithOther = (
  arrayToFilter: any[],
  arr: any[],
  field: string,
) => arrayToFilter.filter((el) => !arr.some((f) => f[field] === el[field]));

export const returnIfNotEmpty = (t: string, o: any | any[]) => {
  if (t === 'object') return Object.keys(o).length > 0 ? o : undefined;

  if (t === 'arr') return o.length > 0 ? o : undefined;
};

export const removeDuplicates = (myArr: any[], prop: string | number) => {
  return myArr.filter((obj, pos, arr) => {
    return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
};
