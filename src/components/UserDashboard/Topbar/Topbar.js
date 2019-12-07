import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import { Texture, ControlPoint, NotificationsOutlined  } from '@material-ui/icons';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    background: 'white',
    paddingBottom: '10px',
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  img: {
    paddingTop: '6px',
    height: '40px',
  },
  search: {
    padding: '6px',
    border: 'none',
    outline: 'none',
    marginTop: '8px',
    marginRight: '16px',
    fontSize: '17px',
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <img
            className={classes.img}
            alt="Logo"
            src={require('../../../assets/img/hmanlogo2.png')}
          />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton>
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <ControlPoint  />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
          >
            <NotificationsOutlined />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
        <IconButton>
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <ControlPoint  />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
          >
            <NotificationsOutlined />
          </IconButton>
          <IconButton
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
