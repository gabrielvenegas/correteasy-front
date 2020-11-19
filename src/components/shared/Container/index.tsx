import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import './styles.css';

type ContainerProps = {
  children: JSX.Element;
  title: string;
  showButtonOnTop: boolean;
  textButtonOnTop?: string;
  routerLink?: string;
  onClickButtonTop?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
};

const Container = (props: ContainerProps & any): JSX.Element => {
  const {
    children,
    title,
    showButtonOnTop,
    textButtonOnTop,
    routerLink,
    onClickButtonTop,
    ...restOfProps
  } = props;

  return (
    <Grid item xs={12} {...restOfProps}>
      <Paper className="paper_content">
        <div className="flex flexWrap flexJustifySpaceBetween div_header_container">
          <Typography gutterBottom align="left" variant="h6" component="h3">
            {title}
          </Typography>
          {showButtonOnTop &&
            (routerLink ? (
              <Button
                className="button buttonContainedRounded buttonContainedColorPrimary CTA"
                component={RouterLink}
                to={routerLink}
              >
                {textButtonOnTop}
              </Button>
            ) : onClickButtonTop ? (
              <Button
                className="button buttonContainedRounded buttonContainedColorPrimary CTA"
                onClick={(event: any): void => {
                  onClickButtonTop(event);
                }}
                style={{ position: 'fixed', right: '5%' }}
              >
                {textButtonOnTop}
              </Button>
            ) : (
              <Button className="button buttonContainedRounded buttonContainedColorPrimary CTA">
                {textButtonOnTop}
              </Button>
            ))}
        </div>
        {children}
      </Paper>
    </Grid>
  );
};

export default Container;
