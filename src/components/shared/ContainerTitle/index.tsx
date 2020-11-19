import React from 'react';
import { Typography } from '@material-ui/core';

const ContainerTitle = ({ title }: any) => (
  <Typography
    style={{ fontSize: 18 }}
    gutterBottom
    align="left"
    variant="h6"
    component="h4"
  >
    {title}
  </Typography>
);

export default ContainerTitle;
