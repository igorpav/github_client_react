import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Box, Typography} from '@material-ui/core';
import MyProfile from "./MyProfile";
import RepositorySearch from "./Search/RepositorySearch";
import UserSearch from "./Search/UserSearch";
import GET_USER_INFO from "./Graphql/user";

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <Typography
      className="repos"
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color={"default"}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="My profile" href="/my_profile" {...a11yProps(0)} />
          <LinkTab label="Repository search" href="/repositories" {...a11yProps(1)} />
          <LinkTab label="Find user" href="/users" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <MyProfile/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RepositorySearch/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserSearch query={GET_USER_INFO} title={"Search users"} entityName={"user"} initialInput={""}/>
      </TabPanel>
    </div>
  );
}