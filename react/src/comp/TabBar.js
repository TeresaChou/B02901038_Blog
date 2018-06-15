import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Block from './Block';
import Article from './Article';
import socketIOClient from 'socket.io-client';

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
   constructor(props) {
      super(props);
      this.state = {
         value: 0,
         socket: socketIOClient("http://localhost:3001"),
         papers: []
      };
      this.getPaper = this.getPaper.bind(this);
   }
   
   handleChange = (event, value) => {
      this.setState({ value });
   };

   getPaper(t, c, d) {
      var paper = {
         title: t, 
         content: c, 
         date: d
      };
      this.setState( prev => { return {
         papers: [...prev.papers, paper]
      }; })
   }

   componentDidMount() {
      var it = this;
      this.props.setAdd( (t, c, d) => {
         this.state.socket.emit("addPaper", t, c, d);
      });
      this.state.socket.on("init", artics => {
         console.log("data", artics);
         it.setState({
            papers: artics
         });
      });
      this.state.socket.emit("init");
      this.state.socket.on("getPaper", (t, c, d) => {
         this.getPaper(t, c, d);
      });
   }
   
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
                  { this.state.papers.map( paper => 
                     <Tab icon={
                        <Block title={paper.title} content={paper.content} date={paper.date} />}
                     /> )}
                </Tabs>
             </AppBar>
             { this.state.papers.map( (paper, index) => 
                value === index && <TabContainer>
                     <Article title={paper.title} content={paper.content} date={paper.date} />
                   </TabContainer>
             ) }
         </div>
      );
   }
}
   
TabBar.propTypes = {
     classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabBar);
