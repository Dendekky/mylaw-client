import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { Divider, Drawer, Hidden } from '@material-ui/core';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SalesIcon from '@material-ui/icons/Receipt'
import ExpensesIcon from '@material-ui/icons/ShoppingBasket'
import ProductsIcon from '@material-ui/icons/Business'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 50,
    }
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  },
  a: {
    '&:active': {
      background: '#044830'
    },
  },
  img: {
    height: '100px',
    borderRadius: '4px',
  },
  userInfo: {
    padding: '6px 0px 0px 16px',
  },
}));


const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const menuItems = [
    { label: 'Pending Services', icon: <DashboardIcon />, url: '#' },
    { label: 'Approved Services', icon: <SalesIcon />, url: '#' },
    { label: 'Service History', icon: <ExpensesIcon />, url: `/history/${props.userId}` },
    { label: 'Customer Support', icon: <ProductsIcon />, url: '#' },
    { label: 'Notifications', icon: <MailIcon />, url: '#' },
    { label: 'Log Out', icon: <MenuIcon />, url: '#' },
  ]

  const classes = useStyles();
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className={classes.userInfo}>
      <img className={classes.img} src={require('../../../assets/img/faces/avatar.jpg')} />
      <h4>{props.name}</h4>
      <p>{props.email}</p>
      </div>
      <List>
        {menuItems.map((item, index) =>
          <ListItem className={classes.a} button key={index} component={Link} to={item.url}>
            <ListItemIcon> {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        )}
      </List>
    </div>
  )

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
            {drawer}
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
