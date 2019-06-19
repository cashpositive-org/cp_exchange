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
} from '@material-ui/core';
import { Person } from '@material-ui/icons';

import { makeATransfer } from '../../core/transfer';

const initialState = {
  selectedPayee: null,
  transferring: false,
};

class Accounts extends React.Component {
  static propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
    account: PropTypes.object.isRequired,
  };

  state = initialState;

  makeATransfer = amount => async () => {
    this.setState({ transferring: true });

    await makeATransfer({ payee: this.state.selectedPayee, amount });

    this.setState(initialState);
  };

  selectPayee = id => () => {
    this.setState({ selectedPayee: id });
  };

  render() {
    const { accounts } = this.props;
    const { selectedPayee, transferring } = this.state;

    return (
      <Paper>
        <List>
          {accounts.map(_account => (
            <ListItem key={_account._id} dense button onClick={this.selectPayee(_account._id)}>
              <ListItemIcon>
                <Person color={selectedPayee === _account._id ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary={_account.name} />
            </ListItem>
          ))}
        </List>

        <ButtonGroup fullWidth>
          <Button onClick={this.makeATransfer('10')} disabled={!selectedPayee || transferring}>
            Pay 10
          </Button>
          <Button onClick={this.makeATransfer('20')} disabled={!selectedPayee || transferring}>
            Pay 20
          </Button>
          <Button onClick={this.makeATransfer('30')} disabled={!selectedPayee || transferring}>
            Pay 30
          </Button>
        </ButtonGroup>
      </Paper>
    );
  }
}

export default Accounts;
