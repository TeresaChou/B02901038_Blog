import React, { Component } from 'react';
import Header from './comp/Header';
import TabBar from './comp/TabBar';
import AddButton from './comp/AddButton';
import Popup from 'react-popup';
import './comp/popup';
import './App.css';

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         login: false,
         addPaper: null
      };
      this.Login = this.Login.bind(this);
      this.addPaper = this.addPaper.bind(this);
   }

   Login() {
      this.setState({
         login: true
      });
   }

   addPaper() {
      Popup.plugins().AddPaper( (title, content, date) => {
         this.state.addPaper(title, content, date);
      });
   }

   render() {
      return (
         <div className="App">
            <Header loginStatus={this.state.login} login={this.Login} />
            <TabBar setAdd={ set => { this.setState({ addPaper: set }); }} />
            {this.state.login? <AddButton add={this.addPaper} />: null}
         </div>
      );
   }
}

export default App;
