import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Grid, Toolbar, Typography, withStyles } from '@material-ui/core';

import AccountForm from './AccountForm';

import logo from './../../logo.png';

const styles = {
  logo: {
    width: 200,
    height: 'auto',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

function Header({ createAccount, classes, account, accountLoading }) {
  return (
    <Grid item xs={12}>
      <AppBar position="static" color="default">
        <Toolbar className={classes.toolbar} variant="dense">
          <img src={logo} className={classes.logo} alt="CashPositive Logo" />
          {!accountLoading ? (
            <>
              {!account && <AccountForm createAccount={createAccount} />}
              {account && <Typography variant="body2">Welcome, {account.name}</Typography>}
            </>
          ) : (
            <Typography variant="body1">Loading...</Typography>
          )}
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

Header.propTypes = {
  createAccount: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
