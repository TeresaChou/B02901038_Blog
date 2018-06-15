import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
   button: {
      margin: theme.spacing.unit,
      position: "fixed",
      right: 20,
      bottom: 20,
   },
});

function AddButton(props) {
   const { classes } = props;
   return (
      <div>
         <Button variant="fab" color="primary" aria-label="add"
            className={classes.button} onClick={props.add} >
            <AddIcon />
         </Button>
      </div>
   );
}
   
AddButton.propTypes = {
     classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddButton);
