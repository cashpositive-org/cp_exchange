import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, withStyles } from '@material-ui/core';

const styles = {
  name: {
    marginTop: 10,
    marginBottom: 10,
  },
};

class AccountFrom extends React.Component {
  state = {
    name: '',
    error: false,
  };

  onChange = event => {
    this.setState({ name: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    this.setState(({ name }) => {
      if (name.length >= 3 && name.length <= 20) {
        this.props.createAccount(name);

        return null;
      }

      return { error: true };
    });
  };

  render() {
    const { name, error } = this.state;

    return (
      <form method="POST" onSubmit={this.onSubmit}>
        <TextField
          className={this.props.classes.name}
          label="Name"
          error={error}
          value={name}
          FormHelperTextProps={{ error, variant: 'outlined' }}
          variant="outlined"
          helperText="Name must be between 3 to 20 characters long"
          onChange={this.onChange}
          InputProps={{
            endAdornment: (
              <Button variant="contained" type="submit" color="primary">
                Join
              </Button>
            ),
          }}
        />
      </form>
    );
  }
}

AccountFrom.propTypes = {
  createAccount: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default withStyles(styles)(AccountFrom);
