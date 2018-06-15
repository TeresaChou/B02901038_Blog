import React from 'react';
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
               </div>,
      buttons: {
         left: ['cancel'],
         right: [{
            text: 'Submit',
            key: 'enter',
            className: 'success',
            action: function () {
               if(user === "user" && password === "1234") {
                  callback();
                  Popup.close();
               }
               else {
                  Popup.create({
                     title: null,
                     content: "Incorrected user name or password.",
                     buttons: {
                        left: ["cancel"],
                        right: []
                     }
                  }, true);
               }
            }
         }]
      }
   });
});

Popup.registerPlugin('AddPaper', function (callback) {
   let title = null;
   let content = null;
   let titleChange = function (value) {
      title = value;
   };
   let contentChange = function (value) {
      content = value;
   };

   this.create({
      title: 'New Article',
      content: <div>
                  <p>Title:</p>
                  <Prompt onChange={titleChange} value=""/>
                  <br/>
                  <p>Content:</p>
                  <Prompt onChange={contentChange} value="" />
               </div>,
      buttons: {
         left: ['cancel'],
         right: [{
            text: 'Submit',
            key: 'enter',
            className: 'success',
            action: function () {
               callback(title, content, new Date().toDateString());
               Popup.close();
            }
         }]
      }
   });
});
