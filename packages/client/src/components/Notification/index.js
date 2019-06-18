import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar, SnackbarContent, IconButton, withStyles } from '@material-ui/core';
import { amber, green } from '@material-ui/core/colors';
import {
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarnIcon,
  CheckCircle as CheckIcon,
  Close as CloseIcon,
} from '@material-ui/icons';

const variantIcon = {
  success: CheckIcon,
  warning: WarnIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function Notification({ classes, message, onClose, variant, open }) {
  const Icon = variantIcon[variant];

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <SnackbarContent
        className={classes[variant]}
        aria-describedby="notification"
        message={
          <span id="notification" className={classes.message}>
            <Icon className={`${classes.icon} ${classes.iconVariant}`} />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}

Notification.propTypes = {
  classes: PropTypes.shape({
    success: PropTypes.string,
    error: PropTypes.string,
    info: PropTypes.string,
    warning: PropTypes.string,
    icon: PropTypes.string,
    iconVariant: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  open: PropTypes.bool,
  message: PropTypes.string,
  variant: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  closeButton: PropTypes.func,
};

Notification.defaultProps = {
  open: false,
  message: '',
  variant: 'success',
  closeButton: () => {},
};

export default withStyles(styles)(Notification);
