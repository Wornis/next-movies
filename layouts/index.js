import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '../components/Tabs';
import TabPanel from '../components/TabPanel';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabPanel: {
    margin: 15,
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Tabs />
      </AppBar>
      <div className={classes.root}>
        <TabPanel className={classes.tabPanel}>{children}</TabPanel>
      </div>
    </>
  );
};

export default Layout;
