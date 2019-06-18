import React from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles } from '@material-ui/core';

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
  };

  async componentDidMount() {
    const account = await getAccountDetails();

    this.setState({ account, accountLoading: false });
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
    const { account, accountLoading, notification } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Header {...{ account, accountLoading }} createAccount={this.createAccount} />
          <Main {...{ account, accountLoading }} />
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
