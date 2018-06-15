import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
     card: {
            minWidth: 100,
            maxWidth: 200,
            position: "static",
            border: "solid 0.5px LightGray",
          },
     bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
          },
     title: {
            marginBottom: 16,
            fontSize: 14,
          },
     pos: {
            marginBottom: 12,
          },
};

function Block(props) {
     const { classes } = props;
     return (
        <div>
           <Card className={classes.card}>
              <CardContent>
                 <Typography variant="headline" component="h2">
                    {props.title}
                 </Typography>
                 <Typography className={classes.pos}>
                    {props.content.substring(0, 20) + "..."}
                 </Typography>
                 <Typography component="p" color="textSecondary">
                    {props.date}
                 </Typography>
               </CardContent>
            </Card>
         </div>);
}
   
Block.propTypes = {
     classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Block);
