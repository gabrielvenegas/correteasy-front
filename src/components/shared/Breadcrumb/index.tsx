/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-confusing-arrow */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useHistory } from 'react-router-dom';

export interface BreadcrumbItem {
  id: number;
  name: string;
  isLink: boolean;
  route: string;
  goBack?: boolean;
}

interface BreadcrumbProps {
  links: BreadcrumbItem[];
}

const Breadcrumb = (props: BreadcrumbProps): JSX.Element => {
  const routerHistory = useHistory();
  const { links } = props;

  const navigate = ({ route, goBack }: any) => {
    if (goBack) {
      routerHistory.goBack();
    }

    if (route !== '') {
      return routerHistory.push(route);
    }
  };

  return (
    <Grid item xs={12}>
      <Breadcrumbs aria-label="breadcrumb">
        {links &&
          links.map((item: BreadcrumbItem, index: number) =>
            item.isLink ? (
              <p
                key={item.id}
                className="primary"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(item)}
              >
                <b>{item.name}</b>
              </p>
            ) : (
              <p
                key={item.id}
                className={`${
                  links[index + 1] || links[index] === links[0]
                    ? 'primary'
                    : 'cinza'
                }`}
              >
                <b>{item.name}</b>
              </p>
            ),
          )}
      </Breadcrumbs>
      <div className="separator" />
    </Grid>
  );
};

export default Breadcrumb;
