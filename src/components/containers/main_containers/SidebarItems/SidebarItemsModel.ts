export interface SidebarItemChild {
  icon: JSX.Element | null;
  name: string;
  route: string;
  buttonType: 'RouterLink' | 'ExpansionPanel';
  allowedRoles?: string[];
  grandChildrenItems: SidebarItemChild[];
  adminOnly?: boolean;
  permission?: string;
}

export interface SidebarItems {
  group: string;
  childrenItems: SidebarItemChild[];
}
