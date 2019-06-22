import React from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles, CircularProgress } from '@material-ui/core';
import io from 'socket.io-client';

import Header from './components/Header';
import Main from './components/Main';
import Notification from './components/Notification';

import { getBaseUrl } from './utils/api';
import { getTransferMessage } from './utils/format';
import { getAccountDetails, createAccount } from './core/account';

const styles = {
  root: {
    flexGrow: 1,
    position: 'relative',
  },
  loadingContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    top: 250,
  },
};

class App extends React.Component {
  static propTypes = {
    classes: PropTypes.shape({ root: PropTypes.string, loadingContainer: PropTypes.string })
      .isRequired,
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
    const { account, socketConnected } = this.state;

    if (account && !socketConnected) {
      try {
        const socket = io(getBaseUrl(), {
          query: {
            id: account._id,
          },
        });

        socket.on('init', response => {
          const { accounts, transfers } = JSON.parse(response);
          this.setState({ accounts, transfers });
        });

        socket.on('new_account', account => {
          this.setState(state => ({ accounts: [JSON.parse(account), ...state.accounts] }));

          this.showNotification({ message: 'New user added' });
        });

        socket.on('account_update', account => {
          this.setState({ account: JSON.parse(account) });
        });

        socket.on('new_transfer', _transfer => {
          const transfer = JSON.parse(_transfer);

          this.setState(state => ({ transfers: [transfer, ...state.transfers] }));

          this.showNotification({
            message: getTransferMessage(transfer, account._id),
          });
        });

        this.setState({ socketConnected: true });
      } catch (err) {
        this.showNotification({
          variant: 'error',
          message: 'Error happened with socket connections!',
        });

        console.error(err);
      }
    }
  }

  createAccount = async name => {
    this.setState({ accountLoading: true });

    const account = await createAccount(name);

    this.setState({ account, accountLoading: false });
  };

  showNotification = ({ variant = 'info', message }) => {
    this.setState({ notification: { open: true, message, variant } });
  };

  render() {
    const { account, accounts, transfers, accountLoading, notification } = this.state;
    const { classes } = this.props;

    return (
      <div className={`app ${classes.root}`}>
        <Grid container spacing={3}>
          <Header {...{ account, accountLoading }} createAccount={this.createAccount} />
          {!accountLoading && accounts.length + transfers.length === 0 ? (
            <div className={classes.loadingContainer}>
              <CircularProgress variant="indeterminate" />
            </div>
          ) : (
            <Main {...{ account, accountLoading, accounts, transfers }} />
          )}
          <Notification
            open={notification.open}
            message={notification.message}
            variant={notification.variant}
            onClose={() => {
              this.setState({ notification: { open: false } });
            }}
          />
        </Grid>

        <a
          className={
            !accountLoading && Boolean(account) && accounts.length + transfers.length > 0
              ? 'show'
              : ''
          }
          target="_blank"
          id="feedback"
          rel="noopener noreferrer"
          href="https://docs.google.com/forms/d/e/1FAIpQLSdsED93r-1EihTjMMvJ39_z-VdO6HDOklKq1r1xQsM5m2zI6Q/viewform"
        >
          Submit Feedback
        </a>
      </div>
    );
  }
}

export default withStyles(styles)(App);
