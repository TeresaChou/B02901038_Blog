import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popup from 'react-popup';
import './popup';

const styles = {
     root: {
            flexGrow: 1,
          },
     flex: {
            flex: 1,
          },
     menuButton: {
            marginLeft: -12,
            marginRight: 20,
          },
};


function Header(props) {
   const { classes } = props;

   function Login() {
      Popup.plugins().Login( () => {
         props.login();
      } );
   }

   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Toolbar>
               <Typography variant="title" color="inherit" className={classes.flex}>
                 My Blog
               </Typography>
               { !props.loginStatus? <Button color="inherit"onClick={Login}>
                  Login</Button>: null }
            </Toolbar>
        </AppBar>
      </div>
   );
}
   
Header.propTypes = {
     classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
