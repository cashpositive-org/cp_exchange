import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import Accounts from './Accounts';
import Transfers from './Transfers';

function Main({ accounts, account, transfers }) {
  return (
    <>
      <Grid item xs={12} sm={8}>
        {account && transfers.length > 0 && <Transfers {...{ account, transfers }} />}
      </Grid>
      <Grid item xs={12} sm={4}>
        {account && accounts.length > 0 && <Accounts {...{ account, accounts }} />}
      </Grid>
    </>
  );
}

Main.propTypes = {
  account: PropTypes.object,
  accounts: PropTypes.arrayOf(PropTypes.object),
  transfers: PropTypes.arrayOf(PropTypes.object),
};

Main.defaultProps = {
  account: null,
  accounts: [],
  transfers: [],
};

export default Main;
