import React from 'react';
import {
  ViewList,
  DoneAll,
  Assignment
} from '@material-ui/icons';
import { SidebarItems } from './SidebarItemsModel';

const allItems: SidebarItems[] = [
  {
    group: '',
    childrenItems: [
      {
        icon: React.createElement(Assignment, {}) as JSX.Element,
        name: 'Estoque',
        route: '/stock',
        buttonType: 'RouterLink',
        grandChildrenItems: [],
        permission: 'dashboard',
      },
      {
        icon: React.createElement(DoneAll, {}) as JSX.Element,
        name: 'Checklist de produto',
        route: '/check-product',
        buttonType: 'RouterLink',
        grandChildrenItems: [],
        permission: 'dashboard',
      },
      {
        icon: React.createElement(ViewList, {}) as JSX.Element,
        name: 'Pedidos',
        route: '/orders',
        buttonType: 'RouterLink',
        grandChildrenItems: [],
        permission: 'dashboard'
      }
    ],
  },
];

export default allItems;
