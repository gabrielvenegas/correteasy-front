/* eslint-disable react/jsx-no-duplicate-props */
// Componente baseado em https://material-ui.com/components/text-fields/#integration-with-3rd-party-input-libraries
import React from 'react';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

interface InnerDecimalInputProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

interface DecimalInputProps {
  label: string;
}

export interface NumberInputChangeEvent {
  target: {
    name: string;
    value: string;
  };
}

const InnerDecimalInput = (innerProps: InnerDecimalInputProps): JSX.Element => {
  const { inputRef, onChange, ...other } = innerProps;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(innerValues): void => {
        onChange({
          target: {
            name: innerProps.name,
            value: innerValues.value,
          },
        } as NumberInputChangeEvent);
      }}
      isNumericString
      decimalScale={2}
      thousandSeparator="."
      decimalSeparator=","
      prefix=""
    />
  );
};

export const DecimalInput = (props: DecimalInputProps & any): JSX.Element => {
  const { label, ...commomProps } = props;

  return (
    <TextField
      label={label}
      variant="outlined"
      name="decimalInput"
      placeholder="ex: 10,50"
      className="decimalInput"
      {...commomProps}
      InputProps={{
        inputComponent: InnerDecimalInput as any,
      }}
    />
  );
};

const InnerMoneyInput = (innerProps: InnerDecimalInputProps): JSX.Element => {
  const { inputRef, onChange, ...other } = innerProps;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(innerValues): void => {
        onChange({
          target: {
            name: innerProps.name,
            value: innerValues.value,
          },
        } as NumberInputChangeEvent);
      }}
      isNumericString
      decimalScale={2}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
    />
  );
};

export const MoneyInput = (props: DecimalInputProps & any): JSX.Element => {
  const { label, ...commomProps } = props;

  return (
    <TextField
      label={label}
      variant="outlined"
      name="moneyInput"
      placeholder="ex: R$ 10,50"
      className="moneyInput"
      {...commomProps}
      InputProps={{
        inputComponent: InnerMoneyInput as any,
      }}
    />
  );
};

const InnerIntegerInput = (innerProps: InnerDecimalInputProps): JSX.Element => {
  const { inputRef, onChange, ...other } = innerProps;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(innerValues): void => {
        onChange({
          target: {
            name: innerProps.name,
            value: innerValues.value,
          },
        } as NumberInputChangeEvent);
      }}
      isNumericString
      decimalScale={0}
      thousandSeparator="."
      decimalSeparator=","
    />
  );
};

export const IntegerInput = (props: DecimalInputProps & any): JSX.Element => {
  const { label, ...commomProps } = props;

  return (
    <TextField
      label={label}
      variant="outlined"
      name="integerInput"
      placeholder="ex: 1000"
      className="integerInput"
      {...commomProps}
      InputProps={{
        inputComponent: InnerIntegerInput as any,
      }}
      inputProps={{ maxLength: 13 }}
    />
  );
};
