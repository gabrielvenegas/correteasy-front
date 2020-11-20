/* eslint-disable react/no-array-index-key */
// TODO - improve importing mechanics
import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import ProgressRouter from '../components/shared/ProgressRouter';
import UserList from '../pages/UserList/UserList';
import Users from '../pages/Users/Users';

type routes = {
  title: string;
  path: string;
  exact: boolean;
  component: any;
};

const routesData: routes[] = [
  {
    title: 'Usuário',
    path: '/',
    exact: true,
    component: Users,
  },

  {
    title: 'Usuário',
    path: '/usuario',
    exact: true,
    component: Users,
  },
  {
    title: 'Listagem de usuário',
    path: '/usuario/listagem',
    exact: true,
    component: UserList,
  },
];

const Routes = (): JSX.Element => (
  <Suspense fallback={<></>}>
    <Switch>
      {routesData.map((route, index) => (
        <ProgressRouter key={index} {...route} />
      ))}
    </Switch>
  </Suspense>
);

export default Routes;
