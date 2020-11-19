import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    fontSize: theme.typography.pxToRem(14),
  },
}));

const BootstrapTooltip = (commomPropertyes: any): JSX.Element => {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...commomPropertyes} />;
};

export default BootstrapTooltip;
