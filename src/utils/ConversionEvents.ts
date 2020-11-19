/* eslint-disable no-cond-assign */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */

export function stringToTitleCase(value: string): string {
  return value
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function objectToMetaData(
  object: any[],
  typeKey: 'name' | 'title',
): any {
  let arrayKeyValuePair = [{ key: '', value: '' }];

  if (typeKey === 'name') {
    arrayKeyValuePair = object.map((item) => ({
      key: item.name,
      value: item.value,
    }));
  } else {
    arrayKeyValuePair = object.map((item) => ({
      key: item.title,
      value: item.value,
    }));
  }

  let objMetaData: any = {};

  for (let i = 0; i < arrayKeyValuePair.length; i++) {
    let valueAsAKey = arrayKeyValuePair[i].key;
    if (!objMetaData[valueAsAKey]) {
      objMetaData[valueAsAKey] = arrayKeyValuePair[i].value;
    }
  }

  return objMetaData;
}

export function getParams(SQL: string, fullMatch = false): string[] {
  const paramsFound = [];
  const rxp = /{([^}]+)}/g;
  let curMatch;

  while ((curMatch = rxp.exec(SQL))) {
    paramsFound.push(curMatch[fullMatch ? 0 : 1]);
  }

  const paramsFoundWithoutDuplicity = [];

  for (let i = 0; i < paramsFound.length; i += 1) {
    if (paramsFoundWithoutDuplicity.indexOf(paramsFound[i]) === -1) {
      paramsFoundWithoutDuplicity.push(paramsFound[i]);
    }
  }

  return paramsFoundWithoutDuplicity;
}
