// Componente baseado em https://material-ui.com/pt/components/menus/#menus

import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import './ToolbarButton.css';

export const UserMenu = (): JSX.Element => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
      },
      paper: {
        marginRight: theme.spacing(2),
      },
    }),
  );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div />
    </div>
  );
};
