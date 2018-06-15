import React, { Component } from 'react';
import Popup from 'react-popup';

class Prompt extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         value: this.props.defaultValue
      };
      this.onChange = (e) => this._onChange(e);
   }
   componentDidUpdate(prevProps, prevState) {
      if (prevState.value !== this.state.value) {
         this.props.onChange(this.state.value);
      }
   }
   _onChange(e) {
      let value = e.target.value;
      this.setState({value: value});
   }

   render() {
      return <input type="text" className="mm-popup__input" 
               value={this.state.value} onChange={this.onChange} />;
   }
}

Popup.registerPlugin('Login', function (callback) {
   let user = null;
   let password = null;
   let userChange = function (value) {
      user= value;
   };
   let passwordChange = function (value) {
      password = value;
   };

   this.create({
      title: 'Login',
      content: <div>
               <p>User Name:</p>
               <Prompt onChange={userChange} value=""/>
               <br/>
               <p>Password:</p>
               <Prompt onChange={passwordChange} value="" />
               <p style={{color:"red", font-size: "10px"}}>
                  Incorrected user name or password!
               </p>
            </div>,
      buttons: {
         left: ['cancel'],
         right: [{
            text: 'Submit',
            key: 'enter',
            className: 'success',
            action: function () {
               callback(nameValue, partValue);
               Popup.close();
            }
         }]
      }
   });
});

