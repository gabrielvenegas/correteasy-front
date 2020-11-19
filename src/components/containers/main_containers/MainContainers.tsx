/* Componente baseado no exemplo disponível em https://material-ui.com/pt/components/drawers/ */

import React, { useEffect } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  Grid,
  Toolbar,
  CssBaseline,
  IconButton
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon
} from '@material-ui/icons';

import './MainContainers.css';
import Routes from '../../../routes/routes';
import { UserMenu } from './ToolbarButtons/ToolbarButtons';
import SidebarItems from './SidebarItems/SidebarItems';
import { LogoReservaGrande, LogoReservaPequena } from '../../shared/Logo';
import ToolbarDecoration from '../../shared/ToolbarDecoration';
import { SidebarContext } from '../../../contexts/SidebarContext';

// Configurações de estilos

const drawerOpenWidth = 240;
const drawerCloseWidth = 60;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    appBar: {
      width: '100%',
      backgroundColor: 'white',
      color: '#A4A4A4',
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButtonDrawerOpen: {
      marginLeft: drawerOpenWidth,
      transition: theme.transitions.create('margin-left', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButtonDrawerClose: {
      marginLeft: drawerCloseWidth,
      transition: theme.transitions.create('margin-left', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButtonDrawerCloseIsMobile: {
      marginLeft: 0,
      transition: theme.transitions.create('margin-left', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerOpenWidth,
      flexShrink: 0
    },
    drawerOpen: {
      width: drawerOpenWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: `${drawerCloseWidth}px !important`,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1
      }
    },
    drawerCloseMobile: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      visibility: 'hidden',
      width: '0px !important',
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1
      }
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(1.9),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    }
  })
);

const MainContainer = ({ children }: any): JSX.Element => {
  const [isMobile, setIsMobile] = React.useState(false);
  const classes = useStyles();
  const sidebarContext = React.useContext(SidebarContext);

  const handleDrawerOpen = (): void => {
    sidebarContext.setOpen(true);
  };

  const handleDrawerClose = (): void => {
    sidebarContext.setOpen(false);
  };

  // Detecta alteração no SIZE da tela
  useEffect(() => {
    function handleResize(): void {
      if (window.innerWidth <= 600) setIsMobile(true);
      else setIsMobile(false);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      {children}
      {/* TOPBAR */}
      <AppBar
        position="fixed"
        className={clsx(
          classes.appBar,
          sidebarContext.open && classes.appBarShift
        )}
      >
        <Toolbar className="navbar">
          <div className="esquerdaToolbar">
            <IconButton
              aria-label="open drawer"
              className={clsx(
                'menuButtonToolbar',
                sidebarContext.open
                  ? classes.menuButtonDrawerOpen
                  : isMobile
                  ? classes.menuButtonDrawerCloseIsMobile
                  : classes.menuButtonDrawerClose
              )}
              onClick={
                sidebarContext.open ? handleDrawerClose : handleDrawerOpen
              }
              edge="start"
            >
              {sidebarContext.open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </div>

          <div className="direitaToolbar">
            <UserMenu />
            {!isMobile && <ToolbarDecoration />}
          </div>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}

      <Drawer
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: sidebarContext.open,
          [classes.drawerClose]: !sidebarContext.open && !isMobile,
          [classes.drawerCloseMobile]: !sidebarContext.open && isMobile
        })}
        variant="permanent"
        anchor="left"
        open={sidebarContext.open}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: sidebarContext.open,
            [classes.drawerClose]: !sidebarContext.open
          })
        }}
      >
        <div className={`${classes.drawerHeader} sidebarHeader`}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {sidebarContext.open ? <LogoReservaGrande /> : <LogoReservaPequena />}
            </Grid>
          </Grid>
        </div>
        <SidebarItems />
      </Drawer>

      {/* CENTRO */}

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: sidebarContext.open
        })}
      >
        <div className={classes.drawerHeader} />
        <div className="conteudo">
          <Routes />
        </div>
      </main>
    </div>
  );
};

export default MainContainer;
