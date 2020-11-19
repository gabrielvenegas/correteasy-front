/* eslint-disable react/no-array-index-key */
// TODO - improve importing mechanics
import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import ProgressRouter from '../components/shared/ProgressRouter';
import Stock from '../pages/stock/Stock';
import CheckProduct from '../pages/CheckProduct/CheckProduct';
import Orders from '../pages/Orders/Orders';


type routes = {
  title: string;
  path: string;
  exact: boolean;
  component: any;
};

const routesData: routes[] = [
  {
    title: 'Estoque',
    path: '/',
    exact: true,
    component: Stock,
  },
  {
    title: 'Estoque',
    path: '/stock',
    exact: true,
    component: Stock,
  },
  {
    title: 'Checklist de Produto',
    path: '/check-product',
    exact: true,
    component: CheckProduct,
  },
  {
    title: 'Pedidos',
    path: '/orders',
    exact: true,
    component: Orders
  }
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
