import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import {
  Budget
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
        >
          <Budget 
          link='/handymanform'
          value='FIND AN HANDYMAN' />
        </Grid>
         <Grid
         item>
          <Budget 
          link='/itemform'
          value='PROCURE AN ITEM' />
        </Grid>

      </Grid>
    </div>
  );
};

export default Dashboard;
