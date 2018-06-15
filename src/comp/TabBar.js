import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Block from './Block';
import Article from './Article';

function TabContainer(props) {
     return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
              {props.children}
        </Typography>
    );
}
   
TabContainer.propTypes = {
     children: PropTypes.node.isRequired,
};

const styles = theme => ({
     root: {
            flexGrow: 1,
            width: '100%',
            backgroundColor: theme.palette.background.paper,
     },
});

class TabBar extends React.Component {
     state = {
            value: 0,
     };
   
   handleChange = (event, value) => {
          this.setState({ value });
   };
   
   render() {
      const { classes } = this.props;
      const { value } = this.state;
        
      return (
         <div className={classes.root}>
            <AppBar position="static" color="default">
               <Tabs
                  value={value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  scrollable
                  scrollButtons="auto">
                  <Tab icon={<Block />}/>
                  <Tab icon={<Block />}/>
                  <Tab icon={<Block />}/>
                  <Tab label="Item Four" />
                  <Tab label="Item Five" />
                  <Tab label="Item Six" />
                  <Tab label="Item Seven" />
                </Tabs>
             </AppBar>
             {value === 0 && <TabContainer>
                                 <Article />
                              </TabContainer>}
            {value === 1 && <TabContainer>
                                 <Article />
                              </TabContainer>}
             {value === 2 && <TabContainer>Item Three</TabContainer>}
             {value === 3 && <TabContainer>Item Four</TabContainer>}
             {value === 4 && <TabContainer>Item Five</TabContainer>}
             {value === 5 && <TabContainer>Item Six</TabContainer>}
             {value === 6 && <TabContainer>Item Seven</TabContainer>}
         </div>
      );
   }
}
   
TabBar.propTypes = {
     classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabBar);
