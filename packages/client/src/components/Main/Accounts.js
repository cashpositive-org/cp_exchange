import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  Paper,
  ListItem,
  ListItemIcon,
  ListItemText,
  ButtonGroup,
  Button,
  CircularProgress,
  TextField,
  withStyles,
  Tooltip,
} from '@material-ui/core';
import { Person } from '@material-ui/icons';

import { makeATransfer } from '../../core/transfer';

const initialState = {
  selectedPayee: null,
  searchQuery: '',
  visiblePayees: [],
  transferring: false,
};

const styles = {
  paper: {
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
    backgroundColor: 'rgba(0,0,0,0.1)',
    top: 0,
  },
};

class Accounts extends React.Component {
  static propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
    account: PropTypes.object.isRequired,
    classes: PropTypes.shape({
      paper: PropTypes.string,
      loadingContainer: PropTypes.string,
      search: PropTypes.string,
    }).isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.accounts.length === 0) return null;

    return {
      visiblePayees: props.accounts.filter(account =>
        account.name.includes(state.searchQuery.toLowerCase())
      ),
    };
  }

  state = initialState;

  makeATransfer = amount => async () => {
    this.setState({ transferring: true });

    await makeATransfer({ payee: this.state.selectedPayee, amount });

    this.setState(initialState);
  };

  selectPayee = id => () => {
    this.setState({ selectedPayee: id });
  };

  updateSearchQuery = event => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    const { classes, account } = this.props;
    const { selectedPayee, transferring, searchQuery, visiblePayees } = this.state;

    const lowBalance = Number(account.balance.$numberDecimal) < 10;
    const payDisabled = selectedPayee || transferring || lowBalance;

    return (
      <Paper className={classes.paper}>
        <TextField fullWidth value={searchQuery} onChange={this.updateSearchQuery} label="Search" />
        <List>
          {visiblePayees.map(_account => (
            <ListItem
              key={_account._id}
              dense
              button
              disabled={transferring}
              onClick={this.selectPayee(_account._id)}
            >
              <ListItemIcon>
                <Person color={selectedPayee === _account._id ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText
                primary={_account.name}
                style={{ fontWeight: selectedPayee === _account._id ? 'bold' : 'inherit' }}
              />
            </ListItem>
          ))}
        </List>

        <Tooltip title="You do not have enough balance!" open={lowBalance}>
          <ButtonGroup fullWidth>
            <Button onClick={this.makeATransfer('10')} disabled={payDisabled}>
              Pay 10
            </Button>
            <Button onClick={this.makeATransfer('20')} disabled={payDisabled}>
              Pay 20
            </Button>
            <Button onClick={this.makeATransfer('30')} disabled={payDisabled}>
              Pay 30
            </Button>
          </ButtonGroup>
        </Tooltip>

        {transferring && (
          <div className={classes.loadingContainer}>
            <CircularProgress variant="indeterminate" color="primary" />
          </div>
        )}
      </Paper>
    );
  }
}

export default withStyles(styles)(Accounts);
