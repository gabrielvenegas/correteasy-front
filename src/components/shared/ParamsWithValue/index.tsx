/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import { DateInput, DateTimeInput } from '../inputs/DateInput';
import {
  IntegerInput,
  DecimalInput,
  NumberInputChangeEvent,
} from '../inputs/NumberInput';

export interface ParamsWithValueType {
  id?: number;
  name: string;
  value?: any;
  typecast:
    | 'STRING'
    | 'BOOL'
    | 'INTEGER'
    | 'FLOAT'
    | 'DATETIME'
    | 'DATE'
    | 'JSON'
    | 'LIST'
    | 'HTML';
  title: string;
  required?: boolean;
}

type ParamsWithValueProps = {
  params: ParamsWithValueType[];
  labelProperty: 'name' | 'title';
  updateStateParamsInParent: (stateParams: ParamsWithValueType[]) => void;
  extraOnChange?: (params?: any) => void;
  disabled?: boolean;
  gridItemSize?:
    | boolean
    | 6
    | 'auto'
    | 1
    | 2
    | 3
    | 4
    | 5
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | undefined;
};

const ParamsWithValue = (props: ParamsWithValueProps): JSX.Element => {
  const {
    params,
    labelProperty,
    updateStateParamsInParent,
    extraOnChange,
    disabled,
    gridItemSize,
  } = props;
  const [stateParams, setStateParams] = React.useState(
    [] as ParamsWithValueType[]
  );

  useEffect(() => {
    const stateParamsAux: ParamsWithValueType[] = [];
    params.forEach((param) => {
      stateParamsAux.push({ ...param, value: param.value || '' });
    });
    setStateParams(stateParamsAux);
    updateStateParamsInParent(stateParamsAux);
  }, [params]);

  return (
    <>
      {stateParams &&
        stateParams.sort().map((param, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={gridItemSize || 4}>
              <Typography style={{ marginBottom: '15px' }}>
                <b>{labelProperty === 'name' ? param.name : param.title}</b>
              </Typography>
              {param.typecast === 'DATE' ? (
                <>
                  <DateInput
                    variant="outlined"
                    value={param.value || null}
                    disabled={disabled || false}
                    onChange={(date: any): void => {
                      const stateParamsAux = stateParams.slice();
                      stateParamsAux[index].value = date;
                      setStateParams(stateParamsAux);
                      updateStateParamsInParent(stateParamsAux);
                      if (extraOnChange) extraOnChange();
                    }}
                    required={param.required || true}
                  />
                </>
              ) : param.typecast === 'DATETIME' ? (
                <>
                  <DateTimeInput
                    variant="outlined"
                    value={param.value || null}
                    disabled={disabled || false}
                    onChange={(date: any): void => {
                      const stateParamsAux = stateParams.slice();
                      stateParamsAux[index].value = date;
                      setStateParams(stateParamsAux);
                      updateStateParamsInParent(stateParamsAux);
                      if (extraOnChange) extraOnChange();
                    }}
                    required={param.required || true}
                  />
                </>
              ) : param.typecast === 'INTEGER' ? (
                <>
                  <IntegerInput
                    variant="outlined"
                    value={param.value || null}
                    disabled={disabled || false}
                    onChange={(event: NumberInputChangeEvent): void => {
                      const stateParamsAux = stateParams.slice();
                      stateParamsAux[index].value = event.target.value;
                      setStateParams(stateParamsAux);
                      updateStateParamsInParent(stateParamsAux);
                      if (extraOnChange) extraOnChange();
                    }}
                    required={param.required || true}
                  />
                </>
              ) : param.typecast === 'FLOAT' ? (
                <>
                  <DecimalInput
                    variant="outlined"
                    value={param.value || null}
                    disabled={disabled || false}
                    onChange={(event: NumberInputChangeEvent): void => {
                      const stateParamsAux = stateParams.slice();
                      stateParamsAux[index].value = event.target.value;
                      setStateParams(stateParamsAux);
                      updateStateParamsInParent(stateParamsAux);
                      if (extraOnChange) extraOnChange();
                    }}
                    required={param.required || true}
                  />
                </>
              ) : (
                <>
                  <TextField
                    label={labelProperty === 'name' ? param.name : param.title}
                    variant="outlined"
                    value={param.value}
                    disabled={disabled || false}
                    onChange={(event): void => {
                      const stateParamsAux = stateParams.slice();
                      stateParamsAux[index].value = event.target.value;
                      setStateParams(stateParamsAux);
                      updateStateParamsInParent(stateParamsAux);
                      if (extraOnChange) extraOnChange();
                    }}
                    required={param.required || true}
                  />
                </>
              )}
            </Grid>
          </React.Fragment>
        ))}
    </>
  );
};

export default ParamsWithValue;
