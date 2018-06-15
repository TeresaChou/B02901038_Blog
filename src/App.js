import React, { Component } from 'react';
import Header from './comp/Header';
import TabBar from './comp/TabBar';
import AddButton from './comp/AddButton';
import './App.css';

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         login: false
      }
   }

   render() {
      return (
         <div className="App">
            <Header />
            <TabBar />
            <AddButton />
         </div>
      );
   }
}

export default App;
