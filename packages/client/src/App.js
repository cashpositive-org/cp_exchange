import React from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles } from '@material-ui/core';
import io from 'socket.io-client';

import Header from './components/Header';
import Main from './components/Main';
import Notification from './components/Notification';

import { getAccountDetails, createAccount } from './core/account';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class App extends React.Component {
  static propTypes = {
    classes: PropTypes.shape({ root: PropTypes.string }).isRequired,
  };

  state = {
    accountLoading: true,
    account: null,
    notification: {
      open: false,
    },
    socketConnected: false,
    accounts: [],
    transfers: [],
  };

  async componentDidMount() {
    const account = await getAccountDetails();

    this.setState({ account, accountLoading: false });
  }

  componentDidUpdate() {
    if (this.state.account && !this.state.socketConnected) {
      try {
        const socket = io('http://localhost:2000', {
          query: {
            id: this.state.account._id,
          },
        });

        socket.on('init', response => {
          const { accounts, transfers } = JSON.parse(response);
          this.setState({ accounts, transfers });
        });

        socket.on('new_account', accounts => {
          this.setState({ accounts: JSON.parse(accounts) });
        });

        socket.on('account_update', account => {
          this.setState({ account: JSON.parse(account) });
        });

        socket.on('new_transfer', transfers => {
          this.setState({ transfers: JSON.parse(transfers) });
        });

        this.setState({ socketConnected: true });
      } catch (err) {
        console.error(err);
      }
    }
  }

  createAccount = async name => {
    this.setState({ accountLoading: true });

    const account = await createAccount(name);

    this.setState({ account, accountLoading: false });
  };

  showNotification = ({ variant = 'success', message }) => {
    this.setState({ notification: { open: true, message, variant } });
  };

  render() {
    const { account, accounts, transfers, accountLoading, notification } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Header {...{ account, accountLoading }} createAccount={this.createAccount} />
          <Main {...{ account, accountLoading, accounts, transfers }} />
          <Notification
            open={notification.open}
            message={notification.message}
            variant={notification.variant}
            onClose={() => {
              this.setState({ notification: { open: false } });
            }}
          />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
