import React from 'react';
var Pagination = require('rc-pagination');

require('./App.less');

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Hello JokerUI</h1>
    );
  }
}