/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable no-confusing-arrow */
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import allItems from './SidebarItemsData';
import './SidebarItems.css';
import {
  SidebarItemChild,
} from './SidebarItemsModel';
import { SidebarContext } from '../../../../contexts/SidebarContext';
import BootstrapTooltip from '../../../shared/Tooltip';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

type MenuButtonsProp = {
  childItem: SidebarItemChild;
};

const MenuButtons = (props: MenuButtonsProp): JSX.Element => {
  const classes = useStyles();
  const { childItem } = props;
  const sidebarContext = useContext(SidebarContext);
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean,
  ): void => {
    setExpanded(newExpanded ? panel : false);
  };

  const TooltipParent = ({ children }: any): JSX.Element =>
    sidebarContext.open ? (
      <>{children}</>
    ) : (
      <BootstrapTooltip title={childItem.name} arrow placement="right">
        {children}
      </BootstrapTooltip>
    );

  const listItem = (
    <TooltipParent>
      <ListItem
        button
        component={Link}
        to={childItem.route}
        className="buttonSideBar"
      >
        {childItem.icon != null && (
          <ListItemIcon>{childItem.icon}</ListItemIcon>
        )}
        <ListItemText primary={childItem.name} />
      </ListItem>
    </TooltipParent>
  );

  return childItem.buttonType === 'RouterLink' ? (
    <>{listItem}</>
  ) : (
    <TooltipParent>
      <ExpansionPanel
        expanded={!sidebarContext.open ? false : expanded === 'panel1'}
        onChange={handleChange('panel1')}
        className="expansionPanelMenuLateral"
      >
        <ExpansionPanelSummary
          style={{ paddingLeft: 58 }}
          className="expansionPanelSummaryMenuLateral"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={(): void => sidebarContext.setOpen(true)}
        >
          {childItem.icon !== null && (
            <ListItemIcon>{childItem.icon}</ListItemIcon>
          )}
          <Typography className={classes.heading}>{childItem.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="menu-details">
          {childItem.grandChildrenItems.map(
            ({ name, route, icon }, key) => {
              const listItem = (
                <ListItem
                  button
                  key={key}
                  component={Link}
                  to={route}
                  className="buttonSideBar"
                >
                  {icon !== null && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText
                    style={{ marginLeft: icon === null ? 56 : 0 }}
                    primary={name}
                  />
                </ListItem>
              );

                return listItem;
            },
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </TooltipParent>
  );
};

const SidebarItems = (): JSX.Element => (
  <List>
    {allItems.map(
        (item, key): JSX.Element => (
          <div key={key} className="menusLaterais">
            {item.childrenItems &&
              item.childrenItems.map(
                (childItem, key) =>
                  <MenuButtons key={key} childItem={childItem} />
              )}
          </div>
        ),
      )}
  </List>
  );

export default SidebarItems;
