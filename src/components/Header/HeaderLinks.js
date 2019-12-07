import React from 'react';
// react components for routing our app without refresh
import { Link } from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';

// @material-ui/icons
import { Apps, CloudDownload } from '@material-ui/icons';

// core components
import CustomDropdown from '../CustomDropdown/CustomDropdown';
import Button from '../CustomButtons/Button';

import styles from '../../assets/jss/material-kit-react/components/headerLinksStyle';

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            component={Link}
            to='/addtalk'
            className={classes.navLink}
          >
        ADD TALK</Button>
      </ListItem>
      <ListItem className={classes.listItem}>
          <Button
            component={Link}
            to='/'
            color="transparent"
            className={classes.navLink}
          >
            ADD ATTENDEE
          </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          component={Link}
          to='/talk/assign'
          className={classes.navLink}
        >
          ASSIGN TALK
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
            component={Link}
            to="/talklist"
          >
            VIEW ALL TALKS
          </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
            component={Link}
            to="/attendeelist"
          >
            VIEW ALL ATTENDEES
          </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
            component={Link}
            to="/assignedtalk"
          >
            VIEW ASSIGNED TALKS
          </Button>
      </ListItem>
    </List>
  );
}
