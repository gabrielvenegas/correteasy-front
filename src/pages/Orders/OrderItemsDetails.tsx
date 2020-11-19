import React, { forwardRef, ReactElement, Ref } from 'react';
import { TransitionProps } from '@material-ui/core/transitions';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';


const Transition = forwardRef((
  props: TransitionProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);


const OrderItemsDetails = (props: any) => {
  const { open, handleClose, item } = props;
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{`Produto: ${item.name}`}</DialogTitle>
      <DialogContent>
        <TableHead>
          <TableRow>
            <TableCell>
              Status Reserva
            </TableCell>
            <TableCell>
              Status Mkt
            </TableCell>
            <TableCell>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              {item.status_reserva}
            </TableCell>
            <TableCell>
              {item.status_mkt}
            </TableCell>
            <TableCell>
              <div className="flex flexAlignItemsCenter">
                <div
                  className={`iconRedondoStatus ${
                      !item.divergent ? 'cellStatusAtivo' : 'cellStatusInativo'
                    }`}
                />
                <div className="flex flexAlignItemsCenter flexJustifyCenter">
                  {item.divergent ? 'Divergente' : 'Não divergente'}
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderItemsDetails;
