import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import ptBR from 'date-fns/locale/pt-BR';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';

type DateTimeInputProps = {
  label: string;
  minDate?: Date;
  maxDate?: Date;
};

/* Aqui foi necessário usar o Utils do Date-Fns pois o do DayJS tem um bug com a hora
quando usado no input do Material. Permaneci com o dayjs apenas para formatação dos dados na
persistência/exibição pois ele é melhor e ja está implementado em outras telas.
Não houve quebra na performance ou diferenca significativa no build. */

export const DateInput = (props: DateTimeInputProps & any): JSX.Element => {
  dayjs.extend(utc);
  const { label, minDate, maxDate, ...commomProps } = props;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
      <KeyboardDatePicker
        autoOk
        className="dateTimeModalPicker"
        inputVariant="outlined"
        label={label}
        placeholder="ex: DD/MM/AAAA"
        format="dd/MM/yyyy"
        ampm={false}
        invalidDateMessage="Data em formato inválido."
        minDate={minDate}
        maxDate={maxDate}
        minDateMessage={`A data deve ser maior ou igual a ${dayjs(
          minDate || '1900-01-01',
        ).format('DD/MM/YYYY')}.`}
        maxDateMessage={`A data deve ser menor ou igual a ${dayjs(
          maxDate || '2099-12-31',
        ).format('DD/MM/YYYY')}.`}
        cancelLabel="Cancelar"
        {...commomProps}
      />
    </MuiPickersUtilsProvider>
  );
};

export const DateTimeInput = (props: DateTimeInputProps & any): JSX.Element => {
  dayjs.extend(utc);
  const { label, minDate, maxDate, ...commomProps } = props;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
      <KeyboardDateTimePicker
        autoOk
        className="dateTimeModalPicker"
        inputVariant="outlined"
        label={label}
        placeholder="ex: DD/MM/AAAA HH:MM"
        format="dd/MM/yyyy HH:mm"
        ampm={false}
        invalidDateMessage="Data em formato inválido."
        minDate={minDate}
        maxDate={maxDate}
        minDateMessage={`A data deve ser maior que ${dayjs(
          minDate || '1900-01-01',
        ).format('DD/MM/YYYY')}.`}
        maxDateMessage={`A data deve ser menor do que ${dayjs(
          maxDate || '2099-12-31',
        ).format('DD/MM/YYYY')}.`}
        cancelLabel="Cancelar"
        {...commomProps}
      />
    </MuiPickersUtilsProvider>
  );
};
