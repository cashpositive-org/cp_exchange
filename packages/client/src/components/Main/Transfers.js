import React from 'react';
import PropTypes from 'prop-types';
import { List, Paper, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { TrendingDown, TrendingUp, TrendingFlat } from '@material-ui/icons';

import { localeFormatAmount, localeFormatTime } from '../../utils/format';

function Transfers({ transfers, account }) {
  return (
    <Paper>
      <List>
        {transfers.map(transfer => (
          <ListItem key={transfer._id} dense>
            <ListItemIcon>
              {[transfer.payee._id, transfer.payer._id].includes(account._id) ? (
                <>
                  {transfer.payee._id === account._id && <TrendingUp color="primary" />}
                  {transfer.payer._id === account._id && <TrendingDown color="error" />}
                </>
              ) : (
                <TrendingFlat color="inherit" />
              )}
            </ListItemIcon>
            <ListItemText
              primary={`${transfer.payee.name} received ${localeFormatAmount(
                transfer.amount.$numberDecimal
              )} from 
            ${transfer.payer.name}`}
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
