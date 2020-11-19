// Componente baseado em: https://material-ui.com/pt/components/modal/#modal
import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Paper, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './styles.css';

export interface ModalProps {
  open: boolean;
  children: JSX.Element;
  modalWidth: string;
  handleClose: (open: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

const ModalWithTransition = (props: ModalProps): JSX.Element => {
  const { open, children, modalWidth } = props;
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(false);

  useEffect(() => {
    setModalOpen(open);
  }, [open]);

  const handleClose = (): void => {
    setModalOpen(false);
    props.handleClose(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <>
            <Paper className="modalPaper" style={{ width: modalWidth }}>
              {children}
              <IconButton className="buttonCloseModal" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Paper>
          </>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalWithTransition;
