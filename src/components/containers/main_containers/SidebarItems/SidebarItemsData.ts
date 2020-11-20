import React from 'react';
import {Assignment} from '@material-ui/icons';
import { SidebarItems } from './SidebarItemsModel';

const allItems: SidebarItems[] = [
  {
    group: '',
    childrenItems: [
      {
        icon: React.createElement(Assignment, {}) as JSX.Element,
        name: 'Usuário',
        route: '/usuario',
        buttonType: 'RouterLink',
        grandChildrenItems: [],
        permission: 'dashboard',
      },
    ],
  },
];

export default allItems;
