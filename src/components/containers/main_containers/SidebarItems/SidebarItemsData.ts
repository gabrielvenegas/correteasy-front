import React from 'react';
import { Assignment } from '@material-ui/icons';
import { SidebarItems } from './SidebarItemsModel';

const allItems: SidebarItems[] = [
  {
    group: '',
    childrenItems: [
      {
        icon: React.createElement(Assignment, {}) as JSX.Element,
        name: 'Usuário',
        route: '',
        buttonType: 'ExpansionPanel',
        grandChildrenItems: [
          {
            icon: null,
            name: 'Listagem de Usuário',
            route: '/usuario/listagem',
            buttonType: 'RouterLink',
            permission: '',
            grandChildrenItems: [],
          },
          {
            icon: null,
            name: 'Cadastro de Usuário',
            route: '/usuario',
            buttonType: 'RouterLink',
            permission: '',
            grandChildrenItems: [],
          },
        ],
        permission: '',
      },
    ],
  },
];

export default allItems;
