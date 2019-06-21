import React from 'react';
import PropTypes from 'prop-types';
import { List, Paper, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { TrendingDown, TrendingUp } from '@material-ui/icons';

import { getTransferMessage, localeFormatTime } from '../../utils/format';

function Transfers({ transfers, account }) {
  return (
    <Paper>
      <List>
        {transfers.map(transfer => (
          <ListItem key={transfer._id} dense>
            <ListItemIcon>
              {transfer.payee._id === account._id ? (
                <TrendingUp color="primary" />
              ) : (
                <TrendingDown color="error" />
              )}
            </ListItemIcon>
            <ListItemText
              primary={getTransferMessage(transfer, account._id)}
              secondary={localeFormatTime(transfer.createdAt)}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

Transfers.propTypes = {
  transfers: PropTypes.arrayOf(PropTypes.object).isRequired,
  account: PropTypes.object.isRequired,
};

export default Transfers;
