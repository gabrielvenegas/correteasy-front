/* eslint-disable @typescript-eslint/no-non-null-assertion */
// Componente baseado em https://material-ui.com/components/snackbars/#customized-snackbars

import React, { useEffect } from 'react';
import {
  Snackbar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { AlertContext } from '../../../contexts/AlertContext';

const ToastAlert = (): JSX.Element => {
  const { alert, setAlert } = React.useContext(AlertContext);

  useEffect(() => {
    const timerToCloseAlert = setTimeout(
      () => setAlert({ ...alert, open: false }),
      alert!.timeToClose || 3000,
    );
    return (): void => {
      clearTimeout(timerToCloseAlert);
    };
  }, [alert, setAlert]);

  const TransitionDown = (props: TransitionProps): JSX.Element => (
    <Slide {...props} direction="down" mountOnEnter unmountOnExit />
  );

  const TransitionLeft = (props: TransitionProps): JSX.Element => (
    <Slide {...props} direction="left" mountOnEnter unmountOnExit />
  );

  return (
    <Snackbar
      open={alert!.open}
      anchorOrigin={{
        vertical: alert!.positionY || 'top',
        horizontal: alert!.positionX || 'right',
      }}
      TransitionComponent={
        alert!.positionX === 'right' || !alert!.positionX
          ? TransitionLeft
          : TransitionDown
      }
    >
      <Alert variant="filled" severity={alert!.type}>
        {alert!.title && (
          <AlertTitle>
            {alert!.type === 'success'
              ? 'Sucesso!'
              : alert!.type === 'error'
              ? 'Problema.'
              : 'Alerta!'}
          </AlertTitle>
        )}
        {!alert!.message && alert!.type === 'success'
          ? 'O cadastro foi realizado com sucesso!'
          : !alert!.message &&
            !alert!.ex?.response?.data?.message &&
            alert!.type === 'error'
          ? 'Ocorreu um problema com sua requisição.'
          : alert!.message || alert!.ex?.response?.data?.message}
      </Alert>
    </Snackbar>
  );
};

export default ToastAlert;

// Alertas Modais

type DecisaoProps = {
  title: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  handleDecision: (decision: 'OK' | 'CANCEL') => void;
};

/* Componente baseado em https://material-ui.com/pt/components/dialogs/ */
export const Decision = (props: DecisaoProps): JSX.Element => {
  const { title, message, confirmButtonText, cancelButtonText } = props;

  function madeDecision(decision: 'OK' | 'CANCEL'): void {
    props.handleDecision(decision);
  }

  return (
    <div>
      <Dialog open aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(): void => madeDecision('CANCEL')}>
            {cancelButtonText || 'Cancelar'}
          </Button>
          <Button
            onClick={(): void => madeDecision('OK')}
            className="button buttonContainedColorSecondary"
          >
            {confirmButtonText || 'Confirmar'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
